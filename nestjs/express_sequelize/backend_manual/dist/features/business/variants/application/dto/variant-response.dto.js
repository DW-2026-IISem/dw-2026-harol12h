var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class VariantResponseDto {
    id;
    productId;
    name;
    description;
    isActive;
    createdAt;
    updatedAt;
}
__decorate([
    ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], VariantResponseDto.prototype, "id", void 0);
__decorate([
    ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], VariantResponseDto.prototype, "productId", void 0);
__decorate([
    ApiProperty({ example: 'Talla M' }),
    __metadata("design:type", String)
], VariantResponseDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Variante de talla mediana' }),
    __metadata("design:type", String)
], VariantResponseDto.prototype, "description", void 0);
__decorate([
    ApiProperty({ example: true }),
    __metadata("design:type", Boolean)
], VariantResponseDto.prototype, "isActive", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], VariantResponseDto.prototype, "createdAt", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], VariantResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=variant-response.dto.js.map