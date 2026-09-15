var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsEnum, IsPositive, IsString, MaxLength, Min, } from 'class-validator';
import { Status } from '../../../../../common/enums/status.enum.js';
export class CreateProductDto {
    name;
    brand;
    price;
    minStock;
    quantity;
    productTypeId;
    collectionId;
    status;
}
__decorate([
    ApiProperty({ example: 'Smartphone X' }),
    IsString(),
    IsNotEmpty(),
    MaxLength(150),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: 'TechBrand' }),
    IsString(),
    IsNotEmpty(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateProductDto.prototype, "brand", void 0);
__decorate([
    ApiProperty({ example: 59999 }),
    IsNumber(),
    IsPositive(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    ApiProperty({ example: 5 }),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "minStock", void 0);
__decorate([
    ApiProperty({ example: 50 }),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "quantity", void 0);
__decorate([
    ApiProperty({ example: 1 }),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "productTypeId", void 0);
__decorate([
    ApiProperty({ example: 1 }),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "collectionId", void 0);
__decorate([
    ApiProperty({ enum: Status, example: Status.ACTIVE, required: false }),
    IsEnum(Status),
    __metadata("design:type", String)
], CreateProductDto.prototype, "status", void 0);
//# sourceMappingURL=create-product.dto.js.map