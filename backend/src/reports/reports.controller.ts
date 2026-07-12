import { Controller, Get, Param, Res, UseGuards, Header } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import type { Response } from 'express';

@ApiTags('Reports & Analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('fleet')
  @Roles(Role.FINANCIAL_ANALYST)
  @ApiOperation({ summary: 'Get overall fleet analytics and ROI (Financial Analyst only)' })
  getFleetAnalytics() {
    return this.reportsService.getFleetAnalytics();
  }

  @Get('vehicle/:vehicleId')
  @Roles(Role.FINANCIAL_ANALYST)
  @ApiOperation({ summary: 'Get analytics and ROI for a specific vehicle (Financial Analyst only)' })
  getVehicleAnalytics(@Param('vehicleId') vehicleId: string) {
    return this.reportsService.getVehicleAnalytics(vehicleId);
  }

  @Get('export/csv')
  @Roles(Role.FINANCIAL_ANALYST)
  @ApiOperation({ summary: 'Export fleet analytics as a CSV file (Financial Analyst only)' })
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="fleet_analytics.csv"')
  async exportCsv(@Res() res: Response) {
    const csv = await this.reportsService.generateCsvReport();
    res.send(csv);
  }
}
