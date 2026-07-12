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
exports.CreateFuelLogDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateFuelLogDto {
    vehicleId;
    tripId;
    liters;
    cost;
    date;
}
exports.CreateFuelLogDto = CreateFuelLogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'b9a8c3d1-e5f2-4a7c-9b1d-8e6f5c4d3b2a', description: 'UUID of the Vehicle' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFuelLogDto.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'c1b2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', description: 'Optional UUID of a Trip', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateFuelLogDto.prototype, "tripId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45.5, description: 'Liters of fuel' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateFuelLogDto.prototype, "liters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120.0, description: 'Total cost of the fuel' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateFuelLogDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-12T10:00:00Z', required: false, description: 'Date of fuel logging' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateFuelLogDto.prototype, "date", void 0);
//# sourceMappingURL=create-fuel-log.dto.js.map