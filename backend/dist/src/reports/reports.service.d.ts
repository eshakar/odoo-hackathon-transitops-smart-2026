import { PrismaService } from '../prisma/prisma.service';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    getVehicleAnalytics(vehicleId: string): Promise<{
        vehicleId: string;
        registrationNumber: string;
        fuelEfficiency: number;
        operationalCost: number;
        totalRevenue: number;
        roi: number;
    }>;
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
    }>;
    generateCsvReport(): Promise<string>;
}
