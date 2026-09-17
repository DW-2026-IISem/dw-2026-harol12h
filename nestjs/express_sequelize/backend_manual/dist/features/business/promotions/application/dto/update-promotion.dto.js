var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, IsDateString, IsBoolean, IsOptional } from 'class-validator';
export class UpdatePromotionDto {
    name;
    description;
    discountPercentage;
    startDate;
    endDate;
    active;
}
__decorate([
    ApiPropertyOptional({ example: 'Descuento de verano' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdatePromotionDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: '20% en toda la tienda' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdatePromotionDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({ example: 20 }),
    IsOptional(),
    IsNumber(),
    Min(1),
    Max(100),
    __metadata("design:type", Number)
], UpdatePromotionDto.prototype, "discountPercentage", void 0);
__decorate([
    ApiPropertyOptional({ example: '2026-09-16' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", Date)
], UpdatePromotionDto.prototype, "startDate", void 0);
__decorate([
    ApiPropertyOptional({ example: '2026-10-16' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", Date)
], UpdatePromotionDto.prototype, "endDate", void 0);
__decorate([
    ApiPropertyOptional({ example: true }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdatePromotionDto.prototype, "active", void 0);
//# sourceMappingURL=update-promotion.dto.js.map