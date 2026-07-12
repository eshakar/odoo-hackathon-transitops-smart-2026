"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FinancesService = class FinancesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addFuelLog(createFuelLogDto) {
        const { vehicleId, tripId, liters, cost, date } = createFuelLogDto;
        const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        if (tripId) {
            const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
            if (!trip)
                throw new common_1.NotFoundException('Trip not found');
        }
        return this.prisma.fuelLog.create({
            data: {
                vehicleId,
                ...(tripId && { tripId }),
                liters,
                cost,
                ...(date && { date: new Date(date) }),
            },
        });
    }
    async addExpense(createExpenseDto) {
        const { vehicleId, tripId, amount, category, description, date } = createExpenseDto;
        if (vehicleId) {
            const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
            if (!vehicle)
                throw new common_1.NotFoundException('Vehicle not found');
        }
        if (tripId) {
            const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
            if (!trip)
                throw new common_1.NotFoundException('Trip not found');
        }
        return this.prisma.expense.create({
            data: {
                ...(vehicleId && { vehicleId }),
                ...(tripId && { tripId }),
                amount,
                category,
                ...(description && { description }),
                ...(date && { date: new Date(date) }),
            },
        });
    }
    async getVehicleOperationalCost(vehicleId) {
        const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        const maintenanceLogs = await this.prisma.maintenanceLog.findMany({
            where: { vehicleId },
            select: { cost: true },
        });
        const totalMaintenanceCost = maintenanceLogs.reduce((sum, log) => sum + log.cost, 0);
        const fuelLogs = await this.prisma.fuelLog.findMany({
            where: { vehicleId },
            select: { cost: true },
        });
        const totalFuelCost = fuelLogs.reduce((sum, log) => sum + log.cost, 0);
        const expenses = await this.prisma.expense.findMany({
            where: { vehicleId },
            select: { amount: true },
        });
        const totalOtherExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const totalOperationalCost = totalMaintenanceCost + totalFuelCost + totalOtherExpenses;
        return {
            vehicleId,
            breakdown: {
                maintenance: totalMaintenanceCost,
                fuel: totalFuelCost,
                otherExpenses: totalOtherExpenses,
            },
            totalOperationalCost,
        };
    }
    async getOverallSummary() {
        const fuelLogs = await this.prisma.fuelLog.aggregate({
            _sum: { cost: true },
        });
        const totalFuelCost = fuelLogs._sum.cost || 0;
        const maintenanceLogs = await this.prisma.maintenanceLog.aggregate({
            _sum: { cost: true },
        });
        const totalMaintenanceCost = maintenanceLogs._sum.cost || 0;
        const expenses = await this.prisma.expense.aggregate({
            _sum: { amount: true },
        });
        const totalExpenses = expenses._sum.amount || 0;
        const totalOperationalCost = totalFuelCost + totalMaintenanceCost + totalExpenses;
        return {
            totalFuelCost,
            totalMaintenanceCost,
            totalExpenses,
            totalOperationalCost,
        };
    }
    findAllFuelLogs() {
        return this.prisma.fuelLog.findMany({
            include: { vehicle: true, trip: true },
            orderBy: { date: 'desc' }
        });
    }
    findAllExpenses() {
        return this.prisma.expense.findMany({
            include: { vehicle: true, trip: true },
            orderBy: { date: 'desc' }
        });
    }
};
exports.FinancesService = FinancesService;
exports.FinancesService = FinancesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinancesService);
//# sourceMappingURL=finances.service.js.map