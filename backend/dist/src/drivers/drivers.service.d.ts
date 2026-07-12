import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class DriversService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDriverDto: CreateDriverDto): Promise<{
        id: string;
        name: string;
        licenseNumber: string;
        licenseCategory: string;
        licenseExpiryDate: Date;
        contactNumber: string;
        safetyScore: number;
        status: import("@prisma/client").$Enums.DriverStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        name: string;
        licenseNumber: string;
        licenseCategory: string;
        licenseExpiryDate: Date;
        contactNumber: string;
        safetyScore: number;
        status: import("@prisma/client").$Enums.DriverStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        licenseNumber: string;
        licenseCategory: string;
        licenseExpiryDate: Date;
        contactNumber: string;
        safetyScore: number;
        status: import("@prisma/client").$Enums.DriverStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
    update(id: string, updateDriverDto: UpdateDriverDto): Promise<{
        id: string;
        name: string;
        licenseNumber: string;
        licenseCategory: string;
        licenseExpiryDate: Date;
        contactNumber: string;
        safetyScore: number;
        status: import("@prisma/client").$Enums.DriverStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        licenseNumber: string;
        licenseCategory: string;
        licenseExpiryDate: Date;
        contactNumber: string;
        safetyScore: number;
        status: import("@prisma/client").$Enums.DriverStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
}
