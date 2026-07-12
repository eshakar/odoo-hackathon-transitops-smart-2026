import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getVehicleAnalytics(vehicleId: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: {
        trips: { where: { status: 'COMPLETED' } },
        fuelLogs: true,
        maintenanceLogs: true,
        expenses: true,
      },
    });

    if (!vehicle) throw new NotFoundException('Vehicle not found');

    const totalDistance = vehicle.trips.reduce((sum, t) => sum + t.plannedDistance, 0);
    const totalFuelLiters = vehicle.fuelLogs.reduce((sum, f) => sum + f.liters, 0);
    const fuelEfficiency = totalFuelLiters > 0 ? totalDistance / totalFuelLiters : 0;

    const maintenanceCost = vehicle.maintenanceLogs.reduce((sum, m) => sum + m.cost, 0);
    const fuelCost = vehicle.fuelLogs.reduce((sum, f) => sum + f.cost, 0);
    const otherExpenses = vehicle.expenses.reduce((sum, e) => sum + e.amount, 0);
    const operationalCost = maintenanceCost + fuelCost + otherExpenses;

    const totalRevenue = vehicle.trips.reduce((sum, t) => sum + (t.revenue || 0), 0);

    const roi = vehicle.acquisitionCost > 0 
      ? (totalRevenue - operationalCost) / vehicle.acquisitionCost 
      : 0;

    return {
      vehicleId: vehicle.id,
      registrationNumber: vehicle.registrationNumber,
      fuelEfficiency: parseFloat(fuelEfficiency.toFixed(2)),
      operationalCost: parseFloat(operationalCost.toFixed(2)),
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      roi: parseFloat(roi.toFixed(4)),
    };
  }

  async getFleetAnalytics() {
    const vehicles = await this.prisma.vehicle.findMany();
    const analyticsPromises = vehicles.map(v => this.getVehicleAnalytics(v.id));
    const allAnalytics = await Promise.all(analyticsPromises);

    let totalEfficiency = 0;
    let totalROI = 0;
    let validEfficiencyCount = 0;

    allAnalytics.forEach(a => {
      if (a.fuelEfficiency > 0) {
        totalEfficiency += a.fuelEfficiency;
        validEfficiencyCount++;
      }
      totalROI += a.roi;
    });

    return {
      averageFuelEfficiency: validEfficiencyCount > 0 ? parseFloat((totalEfficiency / validEfficiencyCount).toFixed(2)) : 0,
      averageFleetROI: vehicles.length > 0 ? parseFloat((totalROI / vehicles.length).toFixed(4)) : 0,
      vehicleBreakdown: allAnalytics,
    };
  }

  async generateCsvReport() {
    const data = await this.getFleetAnalytics();
    const headers = ['VehicleID', 'RegistrationNumber', 'FuelEfficiency(km/L)', 'OperationalCost', 'TotalRevenue', 'ROI'];
    
    const rows = data.vehicleBreakdown.map(v => [
      v.vehicleId,
      v.registrationNumber,
      v.fuelEfficiency,
      v.operationalCost,
      v.totalRevenue,
      v.roi
    ].join(','));

    return [headers.join(','), ...rows].join('\n');
  }
}
