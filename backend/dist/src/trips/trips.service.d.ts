import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class TripsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTripDto: CreateTripDto): Promise<{
        id: string;
        source: string;
        destination: string;
        cargoWeight: number;
        plannedDistance: number;
        status: import("@prisma/client").$Enums.TripStatus;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
        driverId: string;
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
        driver: {
            id: string;
            status: import("@prisma/client").$Enums.DriverStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: string | null;
            licenseNumber: string;
            licenseCategory: string;
            licenseExpiryDate: Date;
            contactNumber: string;
            safetyScore: number;
        };
    } & {
        id: string;
        source: string;
        destination: string;
        cargoWeight: number;
        plannedDistance: number;
        status: import("@prisma/client").$Enums.TripStatus;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
        driverId: string;
    })[]>;
    findOne(id: string): Promise<{
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
        driver: {
            id: string;
            status: import("@prisma/client").$Enums.DriverStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: string | null;
            licenseNumber: string;
            licenseCategory: string;
            licenseExpiryDate: Date;
            contactNumber: string;
            safetyScore: number;
        };
    } & {
        id: string;
        source: string;
        destination: string;
        cargoWeight: number;
        plannedDistance: number;
        status: import("@prisma/client").$Enums.TripStatus;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
        driverId: string;
    }>;
    update(id: string, updateTripDto: UpdateTripDto): Promise<{
        id: string;
        source: string;
        destination: string;
        cargoWeight: number;
        plannedDistance: number;
        status: import("@prisma/client").$Enums.TripStatus;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
        driverId: string;
    }>;
    remove(id: string): void;
}
