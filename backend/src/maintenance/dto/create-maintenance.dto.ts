import { IsString, IsNumber, IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MaintenanceStatus } from '@prisma/client';

export class CreateMaintenanceDto {
  @ApiProperty({ example: 'b9a8c3d1-e5f2-4a7c-9b1d-8e6f5c4d3b2a', description: 'The UUID of the vehicle' })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({ example: 'Oil change and tire rotation', description: 'Type of service performed' })
  @IsString()
  @IsNotEmpty()
  serviceType: string;

  @ApiProperty({ example: 150.0, description: 'Cost of the maintenance' })
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @ApiProperty({ example: '2026-07-12T10:00:00Z', required: false, description: 'Date of the maintenance log' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ enum: MaintenanceStatus, example: MaintenanceStatus.PENDING, required: false })
  @IsOptional()
  @IsEnum(MaintenanceStatus)
  status?: MaintenanceStatus;
}
