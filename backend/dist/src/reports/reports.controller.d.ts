import { ReportsService } from './reports.service';
import type { Response } from 'express';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getFleetAnalytics(): Promise<{
        averageFuelEfficiency: number;
        averageFleetROI: number;
        vehicleBreakdown: {
            vehicleId: string;
            registrationNumber: string;
            fuelEfficiency: number;
            operationalCost: number;
            totalRevenue: number;
            roi: number;
        }[];
        monthlyRevenue: {
            month: string;
            revenue: number;
        }[];
    }>;
    getVehicleAnalytics(vehicleId: string): Promise<{
        vehicleId: string;
        registrationNumber: string;
        fuelEfficiency: number;
        operationalCost: number;
        totalRevenue: number;
        roi: number;
    }>;
    exportCsv(res: Response): Promise<void>;
}
