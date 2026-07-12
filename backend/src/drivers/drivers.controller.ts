import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Drivers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @Roles(Role.SAFETY_OFFICER)
  @ApiOperation({ summary: 'Create a new driver profile (Safety Officer only)' })
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  @Roles(Role.SAFETY_OFFICER)
  @ApiOperation({ summary: 'Get all driver profiles (Safety Officer only)' })
  findAll() {
    return this.driversService.findAll();
  }

  @Get(':id')
  @Roles(Role.SAFETY_OFFICER)
  @ApiOperation({ summary: 'Get a single driver profile (Safety Officer only)' })
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SAFETY_OFFICER)
  @ApiOperation({ summary: 'Update a driver profile (Safety Officer only)' })
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @Roles(Role.SAFETY_OFFICER)
  @ApiOperation({ summary: 'Delete a driver profile (Safety Officer only)' })
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }
}
