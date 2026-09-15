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
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';
export class ProductFilterDto {
    page;
    limit;
    search;
    productTypeId;
}
__decorate([
    ApiPropertyOptional({ example: 1 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], ProductFilterDto.prototype, "page", void 0);
__decorate([
    ApiPropertyOptional({ example: 10 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], ProductFilterDto.prototype, "limit", void 0);
__decorate([
    ApiPropertyOptional({ example: 'smartphone' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ProductFilterDto.prototype, "search", void 0);
__decorate([
    ApiPropertyOptional({ example: 1 }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], ProductFilterDto.prototype, "productTypeId", void 0);
//# sourceMappingURL=product-filter.dto.js.map