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
import { ReturnModel } from '../../../../returns/infrastructure/persistence/models/return.model.js';
import { ProductModel } from '../../../../products/infrastructure/persistence/models/product.model.js';

@Table({ tableName: 'return_details' })
export class ReturnDetailModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => ReturnModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare returnId: number;

  @ForeignKey(() => ProductModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare productId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare quantity: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare reason: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
