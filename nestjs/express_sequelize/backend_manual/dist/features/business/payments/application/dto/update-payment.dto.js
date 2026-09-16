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
import { IsNumber, Min, IsString, IsOptional } from 'class-validator';
export class UpdatePaymentDto {
    method;
    amount;
    status;
}
__decorate([
    ApiPropertyOptional({ example: 'efectivo' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "method", void 0);
__decorate([
    ApiPropertyOptional({ example: 120.5 }),
    IsOptional(),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], UpdatePaymentDto.prototype, "amount", void 0);
__decorate([
    ApiPropertyOptional({ example: 'completed' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "status", void 0);
//# sourceMappingURL=update-payment.dto.js.map