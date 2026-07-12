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
exports.CreateVehicleDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateVehicleDto {
    registrationNumber;
    nameModel;
    type;
    maxLoadCapacity;
    odometer;
    acquisitionCost;
    status;
}
exports.CreateVehicleDto = CreateVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'VAN-1234' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ford Transit' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "nameModel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Van' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "maxLoadCapacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "odometer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 35000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "acquisitionCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.VehicleStatus, example: client_1.VehicleStatus.AVAILABLE, required: false }),
    (0, class_validator_1.IsEnum)(client_1.VehicleStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "status", void 0);
//# sourceMappingURL=create-vehicle.dto.js.map