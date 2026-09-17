var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt, } from 'sequelize-typescript';
let PromotionModel = class PromotionModel extends Model {
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], PromotionModel.prototype, "id", void 0);
__decorate([
    Column({ type: DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], PromotionModel.prototype, "name", void 0);
__decorate([
    Column({ type: DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], PromotionModel.prototype, "description", void 0);
__decorate([
    Column({ type: DataType.FLOAT, allowNull: false }),
    __metadata("design:type", Number)
], PromotionModel.prototype, "discountPercentage", void 0);
__decorate([
    Column({ type: DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], PromotionModel.prototype, "startDate", void 0);
__decorate([
    Column({ type: DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], PromotionModel.prototype, "endDate", void 0);
__decorate([
    Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], PromotionModel.prototype, "active", void 0);
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], PromotionModel.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], PromotionModel.prototype, "updatedAt", void 0);
PromotionModel = __decorate([
    Table({ tableName: 'promotions' })
], PromotionModel);
export { PromotionModel };
//# sourceMappingURL=promotion.model.js.map