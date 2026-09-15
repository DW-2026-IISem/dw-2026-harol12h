import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { CollectionModel } from '../../../../collections/infrastructure/persistence/models/collection.model.js';
import { ProductTypeModel } from '../../../../product-types/infrastructure/persistence/models/product-type.model.js';

@Table({ tableName: 'products', timestamps: true })
export class ProductModel extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare brand: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare minStock: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare quantity: number;

  @ForeignKey(() => ProductTypeModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare productTypeId: number;

  @ForeignKey(() => CollectionModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare collectionId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare status: string;
}
