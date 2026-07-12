import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  async create(createMaintenanceDto: CreateMaintenanceDto) {
    const { vehicleId, serviceType, cost, date, status } = createMaintenanceDto;

    // Check if vehicle exists
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    // Use a transaction to ensure both operations succeed or fail together
    return this.prisma.$transaction(async (prisma) => {
      const maintenanceLog = await prisma.maintenanceLog.create({
        data: {
          vehicleId,
          serviceType,
          cost,
          ...(date && { date: new Date(date) }),
          ...(status && { status }),
        },
      });

      await prisma.vehicle.update({
        where: { id: vehicleId },
        data: { status: 'IN_SHOP' },
      });

      return maintenanceLog;
    });
  }

  findAll() {
    return this.prisma.maintenanceLog.findMany({
      include: { vehicle: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} maintenance`;
  }

  async update(id: string, updateMaintenanceDto: UpdateMaintenanceDto) {
    const existingLog = await this.prisma.maintenanceLog.findUnique({
      where: { id },
      include: { vehicle: true },
    });

    if (!existingLog) {
      throw new NotFoundException('Maintenance log not found');
    }

    return this.prisma.$transaction(async (prisma) => {
      const updatedLog = await prisma.maintenanceLog.update({
        where: { id },
        data: {
          ...updateMaintenanceDto,
          ...(updateMaintenanceDto.date && { date: new Date(updateMaintenanceDto.date) }),
        },
      });

      // If status changed to COMPLETED, restore vehicle if it's not RETIRED
      if (
        updateMaintenanceDto.status === 'COMPLETED' &&
        existingLog.status !== 'COMPLETED'
      ) {
        if (existingLog.vehicle.status !== 'RETIRED') {
          await prisma.vehicle.update({
            where: { id: existingLog.vehicleId },
            data: { status: 'AVAILABLE' },
          });
        }
      }

      return updatedLog;
    });
  }

  async remove(id: string) {
    try {
      return await this.prisma.maintenanceLog.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Maintenance log not found');
    }
  }
}
