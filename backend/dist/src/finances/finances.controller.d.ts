import { FinancesService } from './finances.service';
import { CreateFuelLogDto } from './dto/create-fuel-log.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
export declare class FinancesController {
    private readonly financesService;
    constructor(financesService: FinancesService);
    addFuelLog(createFuelLogDto: CreateFuelLogDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string;
        cost: number;
        date: Date;
        tripId: string | null;
        liters: number;
    }>;
    addExpense(createExpenseDto: CreateExpenseDto): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string | null;
        date: Date;
        amount: number;
        category: import("@prisma/client").$Enums.ExpenseCategory;
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
        vehicleId: string;
        cost: number;
        date: Date;
        tripId: string | null;
        liters: number;
    })[]>;
    findAllExpenses(): import("@prisma/client").Prisma.PrismaPromise<({
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
        } | null;
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vehicleId: string | null;
        date: Date;
        amount: number;
        category: import("@prisma/client").$Enums.ExpenseCategory;
    })[]>;
}
