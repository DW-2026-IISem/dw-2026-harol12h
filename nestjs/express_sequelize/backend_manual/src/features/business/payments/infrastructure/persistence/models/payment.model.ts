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

@Table({ tableName: 'payments' })
export class PaymentModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => OrderModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare orderId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare method: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  declare amount: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'pending' })
  declare status: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
