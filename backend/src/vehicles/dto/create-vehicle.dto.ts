import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleStatus } from '@prisma/client';

export class CreateVehicleDto {
  @ApiProperty({ example: 'VAN-1234' })
  @IsString()
  registrationNumber: string;

  @ApiProperty({ example: 'Ford Transit' })
  @IsString()
  nameModel: string;

  @ApiProperty({ example: 'Van' })
  @IsString()
  type: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  maxLoadCapacity: number;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  odometer?: number;

  @ApiProperty({ example: 35000 })
  @IsNumber()
  acquisitionCost: number;

  @ApiProperty({ enum: VehicleStatus, example: VehicleStatus.AVAILABLE, required: false })
  @IsEnum(VehicleStatus)
  @IsOptional()
  status?: VehicleStatus;
}
