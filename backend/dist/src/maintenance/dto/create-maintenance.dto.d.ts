import { MaintenanceStatus } from '@prisma/client';
export declare class CreateMaintenanceDto {
    vehicleId: string;
    serviceType: string;
    cost: number;
    date?: string;
    status?: MaintenanceStatus;
}
