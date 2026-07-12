import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuelLogDto } from './dto/create-fuel-log.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinancesService {
  constructor(private prisma: PrismaService) {}

  async addFuelLog(createFuelLogDto: CreateFuelLogDto) {
    const { vehicleId, tripId, liters, cost, date } = createFuelLogDto;

    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    if (tripId) {
      const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
      if (!trip) throw new NotFoundException('Trip not found');
    }

    return this.prisma.fuelLog.create({
      data: {
        vehicleId,
        ...(tripId && { tripId }),
        liters,
        cost,
        ...(date && { date: new Date(date) }),
      },
    });
  }

  async addExpense(createExpenseDto: CreateExpenseDto) {
    const { vehicleId, amount, category, description, date } = createExpenseDto;

    if (vehicleId) {
      const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
      if (!vehicle) throw new NotFoundException('Vehicle not found');
    }

    return this.prisma.expense.create({
      data: {
        ...(vehicleId && { vehicleId }),
        amount,
        category,
        ...(description && { description }),
        ...(date && { date: new Date(date) }),
      },
    });
  }

  async getVehicleOperationalCost(vehicleId: string) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    // Fetch Maintenance Costs
    const maintenanceLogs = await this.prisma.maintenanceLog.findMany({
      where: { vehicleId },
      select: { cost: true },
    });
    const totalMaintenanceCost = maintenanceLogs.reduce((sum, log) => sum + log.cost, 0);

    // Fetch Fuel Costs
    const fuelLogs = await this.prisma.fuelLog.findMany({
      where: { vehicleId },
      select: { cost: true },
    });
    const totalFuelCost = fuelLogs.reduce((sum, log) => sum + log.cost, 0);

    // Fetch Other Expenses tied to Vehicle
    const expenses = await this.prisma.expense.findMany({
      where: { vehicleId },
      select: { amount: true },
    });
    const totalOtherExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    const totalOperationalCost = totalMaintenanceCost + totalFuelCost + totalOtherExpenses;

    return {
      vehicleId,
      breakdown: {
        maintenance: totalMaintenanceCost,
        fuel: totalFuelCost,
        otherExpenses: totalOtherExpenses,
      },
      totalOperationalCost,
    };
  }

  findAllFuelLogs() {
    return this.prisma.fuelLog.findMany({ include: { vehicle: true } });
  }

  findAllExpenses() {
    return this.prisma.expense.findMany({ include: { vehicle: true } });
  }
}
