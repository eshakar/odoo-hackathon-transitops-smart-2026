import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleStatus } from '@prisma/client';

export class GetDashboardFilterDto {
  @ApiProperty({ required: false, description: 'Filter by vehicle type (e.g., Truck, Van)' })
  @IsOptional()
  @IsString()
  vehicleType?: string;

  @ApiProperty({ required: false, enum: VehicleStatus, description: 'Filter by vehicle status' })
  @IsOptional()
  @IsEnum(VehicleStatus)
  vehicleStatus?: VehicleStatus;
}
