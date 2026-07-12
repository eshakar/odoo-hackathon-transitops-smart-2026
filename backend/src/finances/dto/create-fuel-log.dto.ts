import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuelLogDto {
  @ApiProperty({ example: 'b9a8c3d1-e5f2-4a7c-9b1d-8e6f5c4d3b2a', description: 'UUID of the Vehicle' })
  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({ example: 'c1b2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', description: 'Optional UUID of a Trip', required: false })
  @IsOptional()
  @IsUUID()
  tripId?: string;

  @ApiProperty({ example: 45.5, description: 'Liters of fuel' })
  @IsNumber()
  @IsNotEmpty()
  liters: number;

  @ApiProperty({ example: 120.0, description: 'Total cost of the fuel' })
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @ApiProperty({ example: '2026-07-12T10:00:00Z', required: false, description: 'Date of fuel logging' })
  @IsOptional()
  @IsDateString()
  date?: string;
}
