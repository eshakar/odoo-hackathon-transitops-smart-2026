import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    create(createTripDto: CreateTripDto): Promise<{
        source: string;
        destination: string;
        vehicleId: string;
        driverId: string;
        cargoWeight: number;
        plannedDistance: number;
        revenue: number | null;
        id: string;
        status: import("@prisma/client").$Enums.TripStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        vehicle: {
            type: string;
            id: string;
            registrationNumber: string;
            nameModel: string;
            maxLoadCapacity: number;
            odometer: number;
            acquisitionCost: number;
            status: import("@prisma/client").$Enums.VehicleStatus;
            createdAt: Date;
            updatedAt: Date;
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
        source: string;
        destination: string;
        vehicleId: string;
        driverId: string;
        cargoWeight: number;
        plannedDistance: number;
        revenue: number | null;
        id: string;
        status: import("@prisma/client").$Enums.TripStatus;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        vehicle: {
            type: string;
            id: string;
            registrationNumber: string;
            nameModel: string;
            maxLoadCapacity: number;
            odometer: number;
            acquisitionCost: number;
            status: import("@prisma/client").$Enums.VehicleStatus;
            createdAt: Date;
            updatedAt: Date;
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
        source: string;
        destination: string;
        vehicleId: string;
        driverId: string;
        cargoWeight: number;
        plannedDistance: number;
        revenue: number | null;
        id: string;
        status: import("@prisma/client").$Enums.TripStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateTripDto: UpdateTripDto): Promise<{
        source: string;
        destination: string;
        vehicleId: string;
        driverId: string;
        cargoWeight: number;
        plannedDistance: number;
        revenue: number | null;
        id: string;
        status: import("@prisma/client").$Enums.TripStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): void;
}
