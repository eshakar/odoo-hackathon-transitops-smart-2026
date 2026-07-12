import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Trips')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @Roles(Role.DRIVER)
  @ApiOperation({ summary: 'Create a new trip (Dispatcher only)' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  @Roles(Role.DRIVER)
  @ApiOperation({ summary: 'Get all trips (Dispatcher only)' })
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  @Roles(Role.DRIVER)
  @ApiOperation({ summary: 'Get a single trip (Dispatcher only)' })
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(id);
  }

  @Patch(':id/status')
  @Roles(Role.DRIVER)
  @ApiOperation({ summary: 'Update trip lifecycle status (Dispatcher only)' })
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(':id')
  @Roles(Role.DRIVER)
  @ApiOperation({ summary: 'Trips cannot be deleted (Dispatcher only)' })
  remove(@Param('id') id: string) {
    return this.tripsService.remove(id);
  }
}
