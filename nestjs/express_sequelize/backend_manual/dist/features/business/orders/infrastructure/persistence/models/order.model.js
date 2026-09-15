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
import { ClientModel } from '../../../../clients/infrastructure/persistence/models/client.model.js';
let OrderModel = class OrderModel extends Model {
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], OrderModel.prototype, "id", void 0);
__decorate([
    ForeignKey(() => ClientModel),
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], OrderModel.prototype, "clientId", void 0);
__decorate([
    Column({ type: DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], OrderModel.prototype, "orderDate", void 0);
__decorate([
    Column({ type: DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], OrderModel.prototype, "status", void 0);
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], OrderModel.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], OrderModel.prototype, "updatedAt", void 0);
OrderModel = __decorate([
    Table({ tableName: 'orders' })
], OrderModel);
export { OrderModel };
//# sourceMappingURL=order.model.js.map