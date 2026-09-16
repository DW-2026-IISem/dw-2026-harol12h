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
import { OrderModel } from '../../../../orders/infrastructure/persistence/models/order.model.js';
import { ProductModel } from '../../../../products/infrastructure/persistence/models/product.model.js';
let OrderDetailModel = class OrderDetailModel extends Model {
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], OrderDetailModel.prototype, "id", void 0);
__decorate([
    ForeignKey(() => OrderModel),
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], OrderDetailModel.prototype, "orderId", void 0);
__decorate([
    ForeignKey(() => ProductModel),
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], OrderDetailModel.prototype, "productId", void 0);
__decorate([
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], OrderDetailModel.prototype, "quantity", void 0);
__decorate([
    Column({ type: DataType.FLOAT, allowNull: false }),
    __metadata("design:type", Number)
], OrderDetailModel.prototype, "unitPrice", void 0);
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], OrderDetailModel.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], OrderDetailModel.prototype, "updatedAt", void 0);
OrderDetailModel = __decorate([
    Table({ tableName: 'order_details' })
], OrderDetailModel);
export { OrderDetailModel };
//# sourceMappingURL=order-detail.model.js.map