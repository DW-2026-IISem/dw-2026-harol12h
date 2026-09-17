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
import { IsInt, IsString, Min, IsOptional } from 'class-validator';
export class UpdateReturnDetailDto {
    productId;
    quantity;
    reason;
}
__decorate([
    ApiPropertyOptional({ example: 2 }),
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], UpdateReturnDetailDto.prototype, "productId", void 0);
__decorate([
    ApiPropertyOptional({ example: 2 }),
    IsOptional(),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], UpdateReturnDetailDto.prototype, "quantity", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Cambio de talla' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateReturnDetailDto.prototype, "reason", void 0);
//# sourceMappingURL=update-return-detail.dto.js.map