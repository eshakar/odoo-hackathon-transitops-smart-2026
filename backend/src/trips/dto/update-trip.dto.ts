import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TripStatus } from '@prisma/client';

export class UpdateTripDto {
  @ApiProperty({ enum: TripStatus, example: TripStatus.DISPATCHED, description: 'New status for the trip lifecycle' })
  @IsEnum(TripStatus)
  @IsNotEmpty()
  status: TripStatus;
}
