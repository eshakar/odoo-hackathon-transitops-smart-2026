import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetDashboardFilterDto } from './dto/get-dashboard-filter.dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getKPIs(filters: GetDashboardFilterDto) {
    const { vehicleType, vehicleStatus } = filters;

    // Optional filters applied specifically to Vehicle queries
    const vehicleWhereInput: any = {};
    if (vehicleType) vehicleWhereInput.type = vehicleType;
    if (vehicleStatus) vehicleWhereInput.status = vehicleStatus;

    // Use Promise.all to fetch counts concurrently for performance
    const [
      activeVehicles,
      availableVehicles,
      vehiclesInMaintenance,
      totalOperationalVehicles, // Vehicles that are not RETIRED
      activeTrips,
      pendingTrips,
      driversOnDuty,
    ] = await Promise.all([
      this.prisma.vehicle.count({ where: { ...vehicleWhereInput, status: 'ON_TRIP' } }),
      this.prisma.vehicle.count({ where: { ...vehicleWhereInput, status: 'AVAILABLE' } }),
      this.prisma.vehicle.count({ where: { ...vehicleWhereInput, status: 'IN_SHOP' } }),
      this.prisma.vehicle.count({ where: { ...vehicleWhereInput, status: { not: 'RETIRED' } } }),
      
      // Trips & Drivers are not filtered by vehicleType/status from query directly, 
      // but they give an overall system KPI
      this.prisma.trip.count({ where: { status: 'DISPATCHED' } }),
      this.prisma.trip.count({ where: { status: 'DRAFT' } }),
      this.prisma.driver.count({ where: { status: 'ON_TRIP' } }),
    ]);

    const fleetUtilization = totalOperationalVehicles > 0 
      ? (activeVehicles / totalOperationalVehicles) * 100 
      : 0;

    return {
      activeVehicles,
      availableVehicles,
      vehiclesInMaintenance,
      activeTrips,
      pendingTrips,
      driversOnDuty,
      fleetUtilization: parseFloat(fleetUtilization.toFixed(2)),
    };
  }
}
