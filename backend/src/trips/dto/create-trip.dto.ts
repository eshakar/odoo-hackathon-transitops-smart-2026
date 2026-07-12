import { IsString, IsNotEmpty, IsNumber, IsUUID, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({ example: 'New York Depot', description: 'Starting location of the trip' })
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty({ example: 'Boston Warehouse', description: 'Destination of the trip' })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({ example: 'b9a8c3d1-e5f2-4a7c-9b1d-8e6f5c4d3b2a', description: 'UUID of the Vehicle' })
  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({ example: 'c1b2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', description: 'UUID of the Driver' })
  @IsUUID()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty({ example: 800.5, description: 'Cargo weight in KG (Must not exceed vehicle max load)' })
  @IsNumber()
  @Min(0)
  cargoWeight: number;

  @ApiProperty({ example: 350.2, description: 'Planned distance in KM' })
  @IsNumber()
  @Min(0)
  plannedDistance: number;

  @ApiProperty({ example: 1250.5, description: 'Optional revenue generated from this trip', required: false })
  @IsOptional()
  @IsNumber()
  revenue?: number;
}
