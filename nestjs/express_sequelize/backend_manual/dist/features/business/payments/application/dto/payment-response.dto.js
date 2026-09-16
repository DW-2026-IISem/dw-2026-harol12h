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
export class PaymentResponseDto {
    id;
    orderId;
    method;
    amount;
    status;
    createdAt;
    updatedAt;
}
__decorate([
    ApiProperty(),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "orderId", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "method", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "amount", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "status", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], PaymentResponseDto.prototype, "createdAt", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], PaymentResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=payment-response.dto.js.map