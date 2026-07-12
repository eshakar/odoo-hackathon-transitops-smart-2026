import { ExpenseCategory } from '@prisma/client';
export declare class CreateExpenseDto {
    vehicleId?: string;
    amount: number;
    category: ExpenseCategory;
    description?: string;
    date?: string;
}
