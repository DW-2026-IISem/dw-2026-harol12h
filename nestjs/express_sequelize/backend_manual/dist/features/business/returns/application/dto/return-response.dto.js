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
export class ReturnResponseDto {
    id;
    orderId;
    date;
    reason;
    total;
    status;
    createdAt;
    updatedAt;
}
__decorate([
    ApiProperty(),
    __metadata("design:type", Number)
], ReturnResponseDto.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Number)
], ReturnResponseDto.prototype, "orderId", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], ReturnResponseDto.prototype, "date", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", String)
], ReturnResponseDto.prototype, "reason", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Number)
], ReturnResponseDto.prototype, "total", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", String)
], ReturnResponseDto.prototype, "status", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], ReturnResponseDto.prototype, "createdAt", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], ReturnResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=return-response.dto.js.map