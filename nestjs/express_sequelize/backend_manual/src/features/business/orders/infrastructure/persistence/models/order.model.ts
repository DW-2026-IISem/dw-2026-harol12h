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
import { ClientModel } from '../../../../clients/infrastructure/persistence/models/client.model.js';

@Table({ tableName: 'orders' })
export class OrderModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => ClientModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare clientId: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare orderDate: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  declare status: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
