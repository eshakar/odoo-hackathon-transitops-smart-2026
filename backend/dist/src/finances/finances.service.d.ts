import { CreateFuelLogDto } from './dto/create-fuel-log.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class FinancesService {
    private prisma;
    constructor(prisma: PrismaService);
    addFuelLog(createFuelLogDto: CreateFuelLogDto): Promise<{
        id: string;
        liters: number;
        cost: number;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
        tripId: string | null;
    }>;
    addExpense(createExpenseDto: CreateExpenseDto): Promise<{
        id: string;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string | null;
        amount: number;
        category: import("@prisma/client").$Enums.ExpenseCategory;
        description: string | null;
    }>;
    getVehicleOperationalCost(vehicleId: string): Promise<{
        vehicleId: string;
        breakdown: {
            maintenance: number;
            fuel: number;
            otherExpenses: number;
        };
        totalOperationalCost: number;
    }>;
    findAllFuelLogs(): import("@prisma/client").Prisma.PrismaPromise<({
        vehicle: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.VehicleStatus;
            registrationNumber: string;
            nameModel: string;
            type: string;
            maxLoadCapacity: number;
            odometer: number;
            acquisitionCost: number;
        };
    } & {
        id: string;
        liters: number;
        cost: number;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
        tripId: string | null;
    })[]>;
    findAllExpenses(): import("@prisma/client").Prisma.PrismaPromise<({
        vehicle: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.VehicleStatus;
            registrationNumber: string;
            nameModel: string;
            type: string;
            maxLoadCapacity: number;
            odometer: number;
            acquisitionCost: number;
        } | null;
    } & {
        id: string;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string | null;
        amount: number;
        category: import("@prisma/client").$Enums.ExpenseCategory;
        description: string | null;
    })[]>;
}
