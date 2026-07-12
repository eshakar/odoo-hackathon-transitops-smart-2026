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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MaintenanceService = class MaintenanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMaintenanceDto) {
        const { vehicleId, serviceType, cost, date, status } = createMaintenanceDto;
        const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
        if (!vehicle) {
            throw new common_1.NotFoundException('Vehicle not found');
        }
        return this.prisma.$transaction(async (prisma) => {
            const maintenanceLog = await prisma.maintenanceLog.create({
                data: {
                    vehicleId,
                    serviceType,
                    cost,
                    ...(date && { date: new Date(date) }),
                    ...(status && { status }),
                },
            });
            await prisma.vehicle.update({
                where: { id: vehicleId },
                data: { status: 'IN_SHOP' },
            });
            return maintenanceLog;
        });
    }
    findAll() {
        return this.prisma.maintenanceLog.findMany();
    }
    findOne(id) {
        return `This action returns a #${id} maintenance`;
    }
    async update(id, updateMaintenanceDto) {
        const existingLog = await this.prisma.maintenanceLog.findUnique({
            where: { id },
            include: { vehicle: true },
        });
        if (!existingLog) {
            throw new common_1.NotFoundException('Maintenance log not found');
        }
        return this.prisma.$transaction(async (prisma) => {
            const updatedLog = await prisma.maintenanceLog.update({
                where: { id },
                data: {
                    ...updateMaintenanceDto,
                    ...(updateMaintenanceDto.date && { date: new Date(updateMaintenanceDto.date) }),
                },
            });
            if (updateMaintenanceDto.status === 'COMPLETED' &&
                existingLog.status !== 'COMPLETED') {
                if (existingLog.vehicle.status !== 'RETIRED') {
                    await prisma.vehicle.update({
                        where: { id: existingLog.vehicleId },
                        data: { status: 'AVAILABLE' },
                    });
                }
            }
            return updatedLog;
        });
    }
    async remove(id) {
        try {
            return await this.prisma.maintenanceLog.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.NotFoundException('Maintenance log not found');
        }
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map