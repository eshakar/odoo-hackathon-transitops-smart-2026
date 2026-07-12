import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from '@prisma/client';

export class CreateExpenseDto {
  @ApiProperty({ example: 'b9a8c3d1-e5f2-4a7c-9b1d-8e6f5c4d3b2a', description: 'Optional UUID of the Vehicle', required: false })
  @IsOptional()
  @IsUUID()
  vehicleId?: string;

  @ApiProperty({ example: 'c1b2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', description: 'Optional UUID of a Trip', required: false })
  @IsOptional()
  @IsUUID()
  tripId?: string;

  @ApiProperty({ example: 450.5, description: 'Amount of the expense' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ enum: ExpenseCategory, example: ExpenseCategory.TOLL, description: 'Category of the expense' })
  @IsEnum(ExpenseCategory)
  @IsNotEmpty()
  category: ExpenseCategory;

  @ApiProperty({ example: 'Toll fee on highway 101', description: 'Optional description of the expense', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2026-07-12T10:00:00Z', required: false, description: 'Date of expense' })
  @IsOptional()
  @IsDateString()
  date?: string;
}
