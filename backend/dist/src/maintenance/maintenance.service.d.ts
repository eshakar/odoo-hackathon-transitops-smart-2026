import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class MaintenanceService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createMaintenanceDto: CreateMaintenanceDto): Promise<{
        id: string;
        serviceType: string;
        cost: number;
        date: Date;
        status: import("@prisma/client").$Enums.MaintenanceStatus;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        vehicle: {
            id: string;
            status: import("@prisma/client").$Enums.VehicleStatus;
            createdAt: Date;
            updatedAt: Date;
            registrationNumber: string;
            nameModel: string;
            type: string;
            maxLoadCapacity: number;
            odometer: number;
            acquisitionCost: number;
        };
    } & {
        id: string;
        serviceType: string;
        cost: number;
        date: Date;
        status: import("@prisma/client").$Enums.MaintenanceStatus;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
    })[]>;
    findOne(id: number): string;
    update(id: string, updateMaintenanceDto: UpdateMaintenanceDto): Promise<{
        id: string;
        serviceType: string;
        cost: number;
        date: Date;
        status: import("@prisma/client").$Enums.MaintenanceStatus;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        serviceType: string;
        cost: number;
        date: Date;
        status: import("@prisma/client").$Enums.MaintenanceStatus;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
    }>;
}
