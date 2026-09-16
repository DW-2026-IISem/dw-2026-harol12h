var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AutoIncrement, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt, } from 'sequelize-typescript';
import { ProductModel } from '../../../../products/infrastructure/persistence/models/product.model.js';
let VariantModel = class VariantModel extends Model {
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], VariantModel.prototype, "id", void 0);
__decorate([
    ForeignKey(() => ProductModel),
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], VariantModel.prototype, "productId", void 0);
__decorate([
    Column({ type: DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], VariantModel.prototype, "name", void 0);
__decorate([
    Column({ type: DataType.TEXT, allowNull: true }),
    __metadata("design:type", Object)
], VariantModel.prototype, "description", void 0);
__decorate([
    Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], VariantModel.prototype, "isActive", void 0);
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], VariantModel.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], VariantModel.prototype, "updatedAt", void 0);
VariantModel = __decorate([
    Table({ tableName: 'variants' })
], VariantModel);
export { VariantModel };
//# sourceMappingURL=variant.model.js.map