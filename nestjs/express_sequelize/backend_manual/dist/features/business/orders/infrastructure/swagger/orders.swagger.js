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
export class OrderSwagger {
    id;
    clientId;
    orderDate;
    status;
    createdAt;
    updatedAt;
}
__decorate([
    ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], OrderSwagger.prototype, "id", void 0);
__decorate([
    ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], OrderSwagger.prototype, "clientId", void 0);
__decorate([
    ApiProperty({ example: '2026-09-14' }),
    __metadata("design:type", Date)
], OrderSwagger.prototype, "orderDate", void 0);
__decorate([
    ApiProperty({ example: 'PENDING' }),
    __metadata("design:type", String)
], OrderSwagger.prototype, "status", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], OrderSwagger.prototype, "createdAt", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], OrderSwagger.prototype, "updatedAt", void 0);
//# sourceMappingURL=orders.swagger.js.map