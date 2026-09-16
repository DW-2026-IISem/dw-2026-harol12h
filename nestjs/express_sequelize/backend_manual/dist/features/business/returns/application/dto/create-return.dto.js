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
import { IsInt, IsNumber, Min, IsString, IsDateString } from 'class-validator';
export class CreateReturnDto {
    orderId;
    date;
    reason;
    total;
    status;
}
__decorate([
    ApiProperty({ example: 1 }),
    IsInt(),
    __metadata("design:type", Number)
], CreateReturnDto.prototype, "orderId", void 0);
__decorate([
    ApiProperty({ example: '2026-09-16' }),
    IsDateString(),
    __metadata("design:type", Date)
], CreateReturnDto.prototype, "date", void 0);
__decorate([
    ApiProperty({ example: 'Producto defectuoso' }),
    IsString(),
    __metadata("design:type", String)
], CreateReturnDto.prototype, "reason", void 0);
__decorate([
    ApiProperty({ example: 50.0 }),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateReturnDto.prototype, "total", void 0);
__decorate([
    ApiProperty({ example: 'pending' }),
    IsString(),
    __metadata("design:type", String)
], CreateReturnDto.prototype, "status", void 0);
//# sourceMappingURL=create-return.dto.js.map