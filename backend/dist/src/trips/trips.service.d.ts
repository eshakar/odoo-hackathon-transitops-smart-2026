import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class TripsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTripDto: CreateTripDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TripStatus;
        vehicleId: string;
        source: string;
        destination: string;
        driverId: string;
        cargoWeight: number;
        plannedDistance: number;
        revenue: number | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        driver: {
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
        };
        vehicle: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TripStatus;
        vehicleId: string;
        source: string;
        destination: string;
        driverId: string;
        cargoWeight: number;
        plannedDistance: number;
        revenue: number | null;
    })[]>;
    findOne(id: string): Promise<{
        driver: {
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
        };
        vehicle: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TripStatus;
        vehicleId: string;
        source: string;
        destination: string;
        driverId: string;
        cargoWeight: number;
        plannedDistance: number;
        revenue: number | null;
    }>;
    update(id: string, updateTripDto: UpdateTripDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TripStatus;
        vehicleId: string;
        source: string;
        destination: string;
        driverId: string;
        cargoWeight: number;
        plannedDistance: number;
        revenue: number | null;
    }>;
    remove(id: string): void;
}
