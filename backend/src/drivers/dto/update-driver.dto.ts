import { PartialType } from '@nestjs/swagger';
import { CreateDriverDto } from './create-driver.dto';
import { IsNumber, IsEnum, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DriverStatus } from '@prisma/client';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @ApiProperty({ example: 95.5, required: false, description: 'Safety score from 0 to 100' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  safetyScore?: number;

  @ApiProperty({ enum: DriverStatus, example: DriverStatus.AVAILABLE, required: false })
  @IsOptional()
  @IsEnum(DriverStatus)
  status?: DriverStatus;
}
