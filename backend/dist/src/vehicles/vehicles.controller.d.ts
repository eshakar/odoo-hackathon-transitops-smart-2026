import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
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
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
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
    update(id: string, updateVehicleDto: UpdateVehicleDto): import("@prisma/client").Prisma.Prisma__VehicleClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__VehicleClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
