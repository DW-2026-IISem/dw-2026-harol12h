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
let CollectionModel = class CollectionModel extends Model {
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], CollectionModel.prototype, "id", void 0);
__decorate([
    Column({ type: DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], CollectionModel.prototype, "name", void 0);
__decorate([
    Column({ type: DataType.TEXT, allowNull: true }),
    __metadata("design:type", Object)
], CollectionModel.prototype, "description", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], CollectionModel.prototype, "isActive", void 0);
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], CollectionModel.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], CollectionModel.prototype, "updatedAt", void 0);
CollectionModel = __decorate([
    Table({ tableName: 'collections' })
], CollectionModel);
export { CollectionModel };
//# sourceMappingURL=collection.model.js.map