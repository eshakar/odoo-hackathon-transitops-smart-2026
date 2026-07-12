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
    return this.prisma.maintenanceLog.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} maintenance`;
  }

  update(id: number, updateMaintenanceDto: UpdateMaintenanceDto) {
    return `This action updates a #${id} maintenance`;
  }

  remove(id: number) {
    return `This action removes a #${id} maintenance`;
  }
}
