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
exports.CreateDriverDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateDriverDto {
    name;
    licenseNumber;
    licenseCategory;
    licenseExpiryDate;
    contactNumber;
    userId;
}
exports.CreateDriverDto = CreateDriverDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Name of the driver' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CDL-987654321', description: 'Unique license number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Class A', description: 'Category of the license' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "licenseCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2030-12-31T00:00:00Z', description: 'Expiry date of the license' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "licenseExpiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+1-555-0198', description: 'Contact phone number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "contactNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Optional UUID of the linked User account' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "userId", void 0);
//# sourceMappingURL=create-driver.dto.js.map