import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class VehiclesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createVehicleDto: CreateVehicleDto): Promise<{
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
    }>;
    findAll(): Prisma.PrismaPromise<{
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
    }[]>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, updateVehicleDto: UpdateVehicleDto): Prisma.Prisma__VehicleClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__VehicleClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
}
