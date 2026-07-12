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
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let DriversService = class DriversService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDriverDto) {
        try {
            const { licenseExpiryDate, ...rest } = createDriverDto;
            return await this.prisma.driver.create({
                data: {
                    ...rest,
                    licenseExpiryDate: new Date(licenseExpiryDate),
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('Driver with this license number or user ID already exists');
                }
            }
            throw error;
        }
    }
    findAll() {
        return this.prisma.driver.findMany();
    }
    async findOne(id) {
        const driver = await this.prisma.driver.findUnique({ where: { id } });
        if (!driver)
            throw new common_1.NotFoundException('Driver not found');
        return driver;
    }
    async update(id, updateDriverDto) {
        try {
            const { licenseExpiryDate, ...rest } = updateDriverDto;
            return await this.prisma.driver.update({
                where: { id },
                data: {
                    ...rest,
                    ...(licenseExpiryDate && { licenseExpiryDate: new Date(licenseExpiryDate) }),
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new common_1.NotFoundException('Driver not found');
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.driver.delete({ where: { id } });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new common_1.NotFoundException('Driver not found');
            }
            throw error;
        }
    }
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DriversService);
//# sourceMappingURL=drivers.service.js.map