import { PrismaService } from '../prisma/prisma.service';
import { GetDashboardFilterDto } from './dto/get-dashboard-filter.dto';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getKPIs(filters: GetDashboardFilterDto): Promise<{
        activeVehicles: number;
        availableVehicles: number;
        vehiclesInMaintenance: number;
        activeTrips: number;
        pendingTrips: number;
        driversOnDuty: number;
        fleetUtilization: number;
    }>;
}
