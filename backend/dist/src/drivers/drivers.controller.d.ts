import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
export declare class DriversController {
    private readonly driversService;
    constructor(driversService: DriversService);
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
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
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
