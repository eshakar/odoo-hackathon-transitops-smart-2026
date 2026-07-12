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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getKPIs(filters) {
        const { vehicleType, vehicleStatus } = filters;
        const vehicleWhereInput = {};
        if (vehicleType)
            vehicleWhereInput.type = vehicleType;
        if (vehicleStatus)
            vehicleWhereInput.status = vehicleStatus;
        const [activeVehicles, availableVehicles, vehiclesInMaintenance, totalOperationalVehicles, activeTrips, pendingTrips, driversOnDuty,] = await Promise.all([
            this.prisma.vehicle.count({ where: { ...vehicleWhereInput, status: 'ON_TRIP' } }),
            this.prisma.vehicle.count({ where: { ...vehicleWhereInput, status: 'AVAILABLE' } }),
            this.prisma.vehicle.count({ where: { ...vehicleWhereInput, status: 'IN_SHOP' } }),
            this.prisma.vehicle.count({ where: { ...vehicleWhereInput, status: { not: 'RETIRED' } } }),
            this.prisma.trip.count({ where: { status: 'DISPATCHED' } }),
            this.prisma.trip.count({ where: { status: 'DRAFT' } }),
            this.prisma.driver.count({ where: { status: 'ON_TRIP' } }),
        ]);
        const fleetUtilization = totalOperationalVehicles > 0
            ? (activeVehicles / totalOperationalVehicles) * 100
            : 0;
        return {
            activeVehicles,
            availableVehicles,
            vehiclesInMaintenance,
            activeTrips,
            pendingTrips,
            driversOnDuty,
            fleetUtilization: parseFloat(fleetUtilization.toFixed(2)),
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map