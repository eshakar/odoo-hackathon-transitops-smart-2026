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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getVehicleAnalytics(vehicleId) {
        const vehicle = await this.prisma.vehicle.findUnique({
            where: { id: vehicleId },
            include: {
                trips: { where: { status: 'COMPLETED' } },
                fuelLogs: true,
                maintenanceLogs: true,
                expenses: true,
            },
        });
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        const totalDistance = vehicle.trips.reduce((sum, t) => sum + t.plannedDistance, 0);
        const totalFuelLiters = vehicle.fuelLogs.reduce((sum, f) => sum + f.liters, 0);
        const fuelEfficiency = totalFuelLiters > 0 ? totalDistance / totalFuelLiters : 0;
        const maintenanceCost = vehicle.maintenanceLogs.reduce((sum, m) => sum + m.cost, 0);
        const fuelCost = vehicle.fuelLogs.reduce((sum, f) => sum + f.cost, 0);
        const otherExpenses = vehicle.expenses.reduce((sum, e) => sum + e.amount, 0);
        const operationalCost = maintenanceCost + fuelCost + otherExpenses;
        const totalRevenue = vehicle.trips.reduce((sum, t) => sum + (t.revenue || 0), 0);
        const roi = vehicle.acquisitionCost > 0
            ? (totalRevenue - operationalCost) / vehicle.acquisitionCost
            : 0;
        return {
            vehicleId: vehicle.id,
            registrationNumber: vehicle.registrationNumber,
            fuelEfficiency: parseFloat(fuelEfficiency.toFixed(2)),
            operationalCost: parseFloat(operationalCost.toFixed(2)),
            totalRevenue: parseFloat(totalRevenue.toFixed(2)),
            roi: parseFloat(roi.toFixed(4)),
        };
    }
    async getFleetAnalytics() {
        const vehicles = await this.prisma.vehicle.findMany();
        const analyticsPromises = vehicles.map(v => this.getVehicleAnalytics(v.id));
        const allAnalytics = await Promise.all(analyticsPromises);
        let totalEfficiency = 0;
        let totalROI = 0;
        let validEfficiencyCount = 0;
        allAnalytics.forEach(a => {
            if (a.fuelEfficiency > 0) {
                totalEfficiency += a.fuelEfficiency;
                validEfficiencyCount++;
            }
            totalROI += a.roi;
        });
        return {
            averageFuelEfficiency: validEfficiencyCount > 0 ? parseFloat((totalEfficiency / validEfficiencyCount).toFixed(2)) : 0,
            averageFleetROI: vehicles.length > 0 ? parseFloat((totalROI / vehicles.length).toFixed(4)) : 0,
            vehicleBreakdown: allAnalytics,
        };
    }
    async generateCsvReport() {
        const data = await this.getFleetAnalytics();
        const headers = ['VehicleID', 'RegistrationNumber', 'FuelEfficiency(km/L)', 'OperationalCost', 'TotalRevenue', 'ROI'];
        const rows = data.vehicleBreakdown.map(v => [
            v.vehicleId,
            v.registrationNumber,
            v.fuelEfficiency,
            v.operationalCost,
            v.totalRevenue,
            v.roi
        ].join(','));
        return [headers.join(','), ...rows].join('\n');
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map