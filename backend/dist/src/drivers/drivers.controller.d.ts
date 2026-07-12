import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
export declare class DriversController {
    private readonly driversService;
    constructor(driversService: DriversService);
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
        tripCompletionRate: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
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
        tripCompletionRate: number;
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
        tripCompletionRate: number;
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
        tripCompletionRate: number;
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
        tripCompletionRate: number;
    }>;
}
