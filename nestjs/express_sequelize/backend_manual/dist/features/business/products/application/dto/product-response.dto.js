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
import { Status } from '../../../../../common/enums/status.enum.js';
export class ProductResponseDto {
    id;
    name;
    brand;
    price;
    minStock;
    quantity;
    productTypeId;
    status;
    createdAt;
    updatedAt;
}
__decorate([
    ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "id", void 0);
__decorate([
    ApiProperty({ example: 'Smartphone X' }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: 'TechBrand' }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "brand", void 0);
__decorate([
    ApiProperty({ example: 59999 }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "price", void 0);
__decorate([
    ApiProperty({ example: 5 }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "minStock", void 0);
__decorate([
    ApiProperty({ example: 50 }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "quantity", void 0);
__decorate([
    ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "productTypeId", void 0);
__decorate([
    ApiProperty({ enum: Status, example: Status.ACTIVE }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "status", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], ProductResponseDto.prototype, "createdAt", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], ProductResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=product-response.dto.js.map