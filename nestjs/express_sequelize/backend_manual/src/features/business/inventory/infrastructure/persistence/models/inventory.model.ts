import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { BranchModel } from '../../../../branches/infrastructure/persistence/models/branch.model.js';
import { VariantModel } from '../../../../variants/infrastructure/persistence/models/variant.model.js';

@Table({ tableName: 'inventory' })
export class InventoryModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => BranchModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare branchId: number;

  @ForeignKey(() => VariantModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare variantId: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare quantity: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
