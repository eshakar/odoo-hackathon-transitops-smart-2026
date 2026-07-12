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
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TripsService = class TripsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTripDto) {
        const { vehicleId, driverId, cargoWeight, ...rest } = createTripDto;
        const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        const driver = await this.prisma.driver.findUnique({ where: { id: driverId } });
        if (!driver)
            throw new common_1.NotFoundException('Driver not found');
        if (vehicle.status !== 'AVAILABLE') {
            throw new common_1.BadRequestException(`Vehicle is not available for dispatch (Current status: ${vehicle.status})`);
        }
        if (driver.status !== 'AVAILABLE') {
            throw new common_1.BadRequestException(`Driver is not available for dispatch (Current status: ${driver.status})`);
        }
        if (driver.licenseExpiryDate < new Date()) {
            throw new common_1.BadRequestException('Driver license has expired');
        }
        if (cargoWeight > vehicle.maxLoadCapacity) {
            throw new common_1.BadRequestException(`Cargo weight exceeds vehicle capacity of ${vehicle.maxLoadCapacity} kg`);
        }
        return this.prisma.trip.create({
            data: {
                ...rest,
                cargoWeight,
                vehicleId,
                driverId,
                status: 'DRAFT',
            },
        });
    }
    findAll() {
        return this.prisma.trip.findMany({
            include: { vehicle: true, driver: true },
        });
    }
    async findOne(id) {
        const trip = await this.prisma.trip.findUnique({
            where: { id },
            include: { vehicle: true, driver: true },
        });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        return trip;
    }
    async update(id, updateTripDto) {
        const trip = await this.prisma.trip.findUnique({ where: { id } });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        const { status } = updateTripDto;
        if (trip.status === 'COMPLETED' || trip.status === 'CANCELLED') {
            throw new common_1.BadRequestException('Cannot change status of a completed or cancelled trip');
        }
        return this.prisma.$transaction(async (prisma) => {
            const updatedTrip = await prisma.trip.update({
                where: { id },
                data: { status },
            });
            if (status === 'DISPATCHED' && trip.status === 'DRAFT') {
                await prisma.vehicle.update({ where: { id: trip.vehicleId }, data: { status: 'ON_TRIP' } });
                await prisma.driver.update({ where: { id: trip.driverId }, data: { status: 'ON_TRIP' } });
            }
            else if ((status === 'COMPLETED' || status === 'CANCELLED') &&
                trip.status === 'DISPATCHED') {
                await prisma.vehicle.update({ where: { id: trip.vehicleId }, data: { status: 'AVAILABLE' } });
                await prisma.driver.update({ where: { id: trip.driverId }, data: { status: 'AVAILABLE' } });
            }
            return updatedTrip;
        });
    }
    remove(id) {
        throw new common_1.BadRequestException('Trips cannot be deleted. Cancel them instead.');
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TripsService);
//# sourceMappingURL=trips.service.js.map