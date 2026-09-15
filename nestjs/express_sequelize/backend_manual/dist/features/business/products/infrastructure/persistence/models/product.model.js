var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { CollectionModel } from '../../../../collections/infrastructure/persistence/models/collection.model.js';
import { ProductTypeModel } from '../../../../product-types/infrastructure/persistence/models/product-type.model.js';
let ProductModel = class ProductModel extends Model {
};
__decorate([
    Column({ type: DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], ProductModel.prototype, "name", void 0);
__decorate([
    Column({ type: DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], ProductModel.prototype, "brand", void 0);
__decorate([
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ProductModel.prototype, "price", void 0);
__decorate([
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ProductModel.prototype, "minStock", void 0);
__decorate([
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ProductModel.prototype, "quantity", void 0);
__decorate([
    ForeignKey(() => ProductTypeModel),
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ProductModel.prototype, "productTypeId", void 0);
__decorate([
    ForeignKey(() => CollectionModel),
    Column({ type: DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ProductModel.prototype, "collectionId", void 0);
__decorate([
    Column({ type: DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], ProductModel.prototype, "status", void 0);
ProductModel = __decorate([
    Table({ tableName: 'products', timestamps: true })
], ProductModel);
export { ProductModel };
//# sourceMappingURL=product.model.js.map