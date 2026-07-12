import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    const { vehicleId, driverId, cargoWeight, ...rest } = createTripDto;

    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    const driver = await this.prisma.driver.findUnique({ where: { id: driverId } });
    if (!driver) throw new NotFoundException('Driver not found');

    if (vehicle.status !== 'AVAILABLE') {
      throw new BadRequestException(`Vehicle is not available for dispatch (Current status: ${vehicle.status})`);
    }

    if (driver.status !== 'AVAILABLE') {
      throw new BadRequestException(`Driver is not available for dispatch (Current status: ${driver.status})`);
    }

    if (driver.licenseExpiryDate < new Date()) {
      throw new BadRequestException('Driver license has expired');
    }

    if (cargoWeight > vehicle.maxLoadCapacity) {
      throw new BadRequestException(`Cargo weight exceeds vehicle capacity of ${vehicle.maxLoadCapacity} kg`);
    }

    return this.prisma.trip.create({
      data: {
        ...rest,
        cargoWeight,
        vehicleId,
        driverId,
        status: 'DRAFT',
      },
    });
  }

  findAll() {
    return this.prisma.trip.findMany({
      include: { vehicle: true, driver: true },
    });
  }

  async findOne(id: string) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: { vehicle: true, driver: true },
    });
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const trip = await this.prisma.trip.findUnique({ where: { id } });
    if (!trip) throw new NotFoundException('Trip not found');

    const { status } = updateTripDto;
    
    // Prevent invalid transitions
    if (trip.status === 'COMPLETED' || trip.status === 'CANCELLED') {
      throw new BadRequestException('Cannot change status of a completed or cancelled trip');
    }

    return this.prisma.$transaction(async (prisma) => {
      const updatedTrip = await prisma.trip.update({
        where: { id },
        data: { status },
      });

      if (status === 'DISPATCHED' && trip.status === 'DRAFT') {
        // Change vehicle and driver to ON_TRIP
        await prisma.vehicle.update({ where: { id: trip.vehicleId }, data: { status: 'ON_TRIP' } });
        await prisma.driver.update({ where: { id: trip.driverId }, data: { status: 'ON_TRIP' } });
      } else if (
        (status === 'COMPLETED' || status === 'CANCELLED') && 
        trip.status === 'DISPATCHED'
      ) {
        // Change vehicle and driver back to AVAILABLE
        await prisma.vehicle.update({ where: { id: trip.vehicleId }, data: { status: 'AVAILABLE' } });
        await prisma.driver.update({ where: { id: trip.driverId }, data: { status: 'AVAILABLE' } });
      }

      return updatedTrip;
    });
  }

  remove(id: string) {
    throw new BadRequestException('Trips cannot be deleted. Cancel them instead.');
  }
}
