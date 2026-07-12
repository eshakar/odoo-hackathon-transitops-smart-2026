import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class MaintenanceService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createMaintenanceDto: CreateMaintenanceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.MaintenanceStatus;
        vehicleId: string;
        serviceType: string;
        cost: number;
        date: Date;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.MaintenanceStatus;
        vehicleId: string;
        serviceType: string;
        cost: number;
        date: Date;
    }[]>;
    findOne(id: number): string;
    update(id: string, updateMaintenanceDto: UpdateMaintenanceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.MaintenanceStatus;
        vehicleId: string;
        serviceType: string;
        cost: number;
        date: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.MaintenanceStatus;
        vehicleId: string;
        serviceType: string;
        cost: number;
        date: Date;
    }>;
}
