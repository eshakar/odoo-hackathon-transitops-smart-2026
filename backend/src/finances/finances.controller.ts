import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { CreateFuelLogDto } from './dto/create-fuel-log.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Finances')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Post('fuel')
  @Roles(Role.FINANCIAL_ANALYST)
  @ApiOperation({ summary: 'Log fuel consumption (Financial Analyst only)' })
  addFuelLog(@Body() createFuelLogDto: CreateFuelLogDto) {
    return this.financesService.addFuelLog(createFuelLogDto);
  }

  @Post('expenses')
  @Roles(Role.FINANCIAL_ANALYST)
  @ApiOperation({ summary: 'Log a general expense (Financial Analyst only)' })
  addExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.financesService.addExpense(createExpenseDto);
  }

  @Get('vehicle/:vehicleId/cost')
  @Roles(Role.FINANCIAL_ANALYST)
  @ApiOperation({ summary: 'Get total operational cost of a vehicle (Financial Analyst only)' })
  getVehicleOperationalCost(@Param('vehicleId') vehicleId: string) {
    return this.financesService.getVehicleOperationalCost(vehicleId);
  }

  @Get('fuel')
  @Roles(Role.FINANCIAL_ANALYST)
  @ApiOperation({ summary: 'Get all fuel logs (Financial Analyst only)' })
  findAllFuelLogs() {
    return this.financesService.findAllFuelLogs();
  }

  @Get('expenses')
  @Roles(Role.FINANCIAL_ANALYST)
  @ApiOperation({ summary: 'Get all expenses (Financial Analyst only)' })
  findAllExpenses() {
    return this.financesService.findAllExpenses();
  }

  @Get('summary')
  @Roles(Role.FINANCIAL_ANALYST)
  @ApiOperation({ summary: 'Get overall financial summary (Financial Analyst only)' })
  getOverallSummary() {
    return this.financesService.getOverallSummary();
  }
}
