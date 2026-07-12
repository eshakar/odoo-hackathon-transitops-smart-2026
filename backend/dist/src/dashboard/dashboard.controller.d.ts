import { DashboardService } from './dashboard.service';
import { GetDashboardFilterDto } from './dto/get-dashboard-filter.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getKPIs(filters: GetDashboardFilterDto): Promise<{
        kpis: {
            activeVehicles: number;
            availableVehicles: number;
            vehiclesInMaintenance: number;
            activeTrips: number;
            pendingTrips: number;
            driversOnDuty: number;
            fleetUtilization: number;
        };
        vehicleStatusBreakdown: {
            Available: number;
            'On Trip': number;
            'In Shop': number;
            Retired: number;
        };
        recentTrips: ({
            driver: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("@prisma/client").$Enums.DriverStatus;
                licenseNumber: string;
                licenseCategory: string;
                licenseExpiryDate: Date;
                contactNumber: string;
                userId: string | null;
                safetyScore: number;
                tripCompletionRate: number;
            };
            vehicle: {
                type: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                registrationNumber: string;
                nameModel: string;
                maxLoadCapacity: number;
                odometer: number;
                acquisitionCost: number;
                status: import("@prisma/client").$Enums.VehicleStatus;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.TripStatus;
            vehicleId: string;
            source: string;
            destination: string;
            driverId: string;
            cargoWeight: number;
            plannedDistance: number;
            revenue: number | null;
        })[];
    }>;
}
