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
exports.GetDashboardFilterDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class GetDashboardFilterDto {
    vehicleType;
    vehicleStatus;
}
exports.GetDashboardFilterDto = GetDashboardFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Filter by vehicle type (e.g., Truck, Van)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetDashboardFilterDto.prototype, "vehicleType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: client_1.VehicleStatus, description: 'Filter by vehicle status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.VehicleStatus),
    __metadata("design:type", String)
], GetDashboardFilterDto.prototype, "vehicleStatus", void 0);
//# sourceMappingURL=get-dashboard-filter.dto.js.map