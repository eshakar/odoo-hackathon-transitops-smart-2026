import { IsString, IsNotEmpty, IsOptional, IsDateString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDriverDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the driver' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'CDL-987654321', description: 'Unique license number' })
  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @ApiProperty({ example: 'Class A', description: 'Category of the license' })
  @IsString()
  @IsNotEmpty()
  licenseCategory: string;

  @ApiProperty({ example: '2030-12-31T00:00:00Z', description: 'Expiry date of the license' })
  @IsDateString()
  @IsNotEmpty()
  licenseExpiryDate: string;

  @ApiProperty({ example: '+1-555-0198', description: 'Contact phone number' })
  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @ApiProperty({ required: false, description: 'Optional UUID of the linked User account' })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
