import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSettingDto {
  @ApiProperty({ example: 'Gandhinagar Depot GJ4', description: 'Depot Name' })
  @IsString()
  @IsOptional()
  depotName?: string;

  @ApiProperty({ example: 'INR (Rs)', description: 'Currency' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ example: 'Kilometers', description: 'Distance Unit' })
  @IsString()
  @IsOptional()
  distanceUnit?: string;
}
