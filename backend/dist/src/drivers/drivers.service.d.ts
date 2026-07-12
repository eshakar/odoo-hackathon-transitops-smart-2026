import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class DriversService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDriverDto: CreateDriverDto): Promise<{
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
    }>;
    findAll(): Prisma.PrismaPromise<{
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
    }[]>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, updateDriverDto: UpdateDriverDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
