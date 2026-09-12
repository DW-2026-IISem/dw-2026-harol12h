var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt, } from 'sequelize-typescript';
import { ClientModel } from '../../../../clients/infrastructure/persistence/models/client.model.js';
let SaleModel = class SaleModel extends Model {
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], SaleModel.prototype, "id", void 0);
__decorate([
    ForeignKey(() => ClientModel),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], SaleModel.prototype, "clientId", void 0);
__decorate([
    Column({ type: DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], SaleModel.prototype, "amount", void 0);
__decorate([
    Column({ type: DataType.STRING(255), allowNull: true }),
    __metadata("design:type", Object)
], SaleModel.prototype, "description", void 0);
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], SaleModel.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], SaleModel.prototype, "updatedAt", void 0);
__decorate([
    BelongsTo(() => ClientModel),
    __metadata("design:type", ClientModel)
], SaleModel.prototype, "client", void 0);
SaleModel = __decorate([
    Table({ tableName: 'sales' })
], SaleModel);
export { SaleModel };
//# sourceMappingURL=sale.model.js.map