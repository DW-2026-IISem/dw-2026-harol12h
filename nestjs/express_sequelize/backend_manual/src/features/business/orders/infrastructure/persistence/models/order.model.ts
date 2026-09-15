import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { ClientModel } from '../../../clients/infrastructure/persistence/models/client.model.js';

@Table({ tableName: 'orders', timestamps: true })
export class OrderModel extends Model {
  @ForeignKey(() => ClientModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare clientId: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare orderDate: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  declare status: string;
}
