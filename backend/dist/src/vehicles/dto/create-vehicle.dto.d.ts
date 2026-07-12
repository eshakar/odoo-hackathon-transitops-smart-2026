import { VehicleStatus } from '@prisma/client';
export declare class CreateVehicleDto {
    registrationNumber: string;
    nameModel: string;
    type: string;
    maxLoadCapacity: number;
    odometer?: number;
    acquisitionCost: number;
    status?: VehicleStatus;
}
