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
import { Status } from '../../../../../../common/enums/status.enum.js';
let ClientModel = class ClientModel extends Model {
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], ClientModel.prototype, "id", void 0);
__decorate([
    Column({ type: DataType.STRING(150), allowNull: false }),
    __metadata("design:type", String)
], ClientModel.prototype, "name", void 0);
__decorate([
    Column({ type: DataType.STRING(255), allowNull: true }),
    __metadata("design:type", Object)
], ClientModel.prototype, "address", void 0);
__decorate([
    Column({ type: DataType.STRING(30), allowNull: true }),
    __metadata("design:type", Object)
], ClientModel.prototype, "phone", void 0);
__decorate([
    Column({ type: DataType.STRING(150), allowNull: true, unique: true }),
    __metadata("design:type", Object)
], ClientModel.prototype, "email", void 0);
__decorate([
    Column({ type: DataType.STRING(255), allowNull: true }),
    __metadata("design:type", Object)
], ClientModel.prototype, "password", void 0);
__decorate([
    Column({
        type: DataType.ENUM(...Object.values(Status)),
        allowNull: false,
        defaultValue: Status.ACTIVE,
    }),
    __metadata("design:type", String)
], ClientModel.prototype, "status", void 0);
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], ClientModel.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], ClientModel.prototype, "updatedAt", void 0);
ClientModel = __decorate([
    Table({ tableName: 'clients' })
], ClientModel);
export { ClientModel };
//# sourceMappingURL=client.model.js.map