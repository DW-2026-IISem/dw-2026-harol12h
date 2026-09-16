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
import { OrderModel } from '../../../../orders/infrastructure/persistence/models/order.model.js';
import { ProductModel } from '../../../../products/infrastructure/persistence/models/product.model.js';

@Table({ tableName: 'order_details' })
export class OrderDetailModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => OrderModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare orderId: number;

  @ForeignKey(() => ProductModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare productId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare quantity: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  declare unitPrice: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
