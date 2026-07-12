import { DashboardService } from './dashboard.service';
import { GetDashboardFilterDto } from './dto/get-dashboard-filter.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
