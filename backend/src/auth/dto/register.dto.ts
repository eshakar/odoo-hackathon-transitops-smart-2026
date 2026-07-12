import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'admin@transitops.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Admin User' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Role, example: Role.FLEET_MANAGER })
  @IsEnum(Role)
  role: Role;
}
