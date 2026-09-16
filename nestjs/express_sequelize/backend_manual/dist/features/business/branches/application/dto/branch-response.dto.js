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
export class BranchResponseDto {
    id;
    name;
    description;
    isActive;
    createdAt;
    updatedAt;
}
__decorate([
    ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], BranchResponseDto.prototype, "id", void 0);
__decorate([
    ApiProperty({ example: 'Sucursal Principal' }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Sucursal central de la empresa' }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "description", void 0);
__decorate([
    ApiProperty({ example: true }),
    __metadata("design:type", Boolean)
], BranchResponseDto.prototype, "isActive", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], BranchResponseDto.prototype, "createdAt", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], BranchResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=branch-response.dto.js.map