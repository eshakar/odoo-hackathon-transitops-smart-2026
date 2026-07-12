import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Maintenance')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @Roles(Role.FLEET_MANAGER)
  @ApiOperation({ summary: 'Create a maintenance record (Fleet Manager only)' })
  create(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    return this.maintenanceService.create(createMaintenanceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all maintenance records' })
  findAll() {
    return this.maintenanceService.findAll();
  }

  @Get(':id')
  @Roles(Role.FLEET_MANAGER)
  @ApiOperation({ summary: 'Get a single maintenance log (Fleet Manager only)' })
  findOne(@Param('id') id: string) {
    return this.maintenanceService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.FLEET_MANAGER)
  @ApiOperation({ summary: 'Update a maintenance log (Fleet Manager only)' })
  update(@Param('id') id: string, @Body() updateMaintenanceDto: UpdateMaintenanceDto) {
    return this.maintenanceService.update(id, updateMaintenanceDto);
  }

  @Delete(':id')
  @Roles(Role.FLEET_MANAGER)
  @ApiOperation({ summary: 'Delete a maintenance log (Fleet Manager only)' })
  remove(@Param('id') id: string) {
    return this.maintenanceService.remove(id);
  }
}
