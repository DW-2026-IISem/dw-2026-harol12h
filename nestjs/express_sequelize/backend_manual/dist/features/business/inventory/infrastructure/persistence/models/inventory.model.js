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
import { BranchModel } from '../../../../branches/infrastructure/persistence/models/branch.model.js';
import { VariantModel } from '../../../../variants/infrastructure/persistence/models/variant.model.js';
let InventoryModel = class InventoryModel extends Model {
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], InventoryModel.prototype, "id", void 0);
__decorate([
    ForeignKey(() => BranchModel),
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], InventoryModel.prototype, "branchId", void 0);
__decorate([
    ForeignKey(() => VariantModel),
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], InventoryModel.prototype, "variantId", void 0);
__decorate([
    Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], InventoryModel.prototype, "quantity", void 0);
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], InventoryModel.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], InventoryModel.prototype, "updatedAt", void 0);
InventoryModel = __decorate([
    Table({ tableName: 'inventory' })
], InventoryModel);
export { InventoryModel };
//# sourceMappingURL=inventory.model.js.map