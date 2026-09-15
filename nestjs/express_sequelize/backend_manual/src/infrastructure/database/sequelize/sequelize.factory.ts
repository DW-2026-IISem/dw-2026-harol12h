import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../../../features/business/clients/infrastructure/persistence/models/client.model';
import { CollectionModel } from '../../../features/business/collections/infrastructure/persistence/models/collection.model';
import { ProductModel } from '../../../features/business/products/infrastructure/persistence/models/product.model';
import { OrderModel } from '../../../features/business/orders/infrastructure/persistence/models/order.model';

export const ALL_MODELS = [
  ClientModel,
  CollectionModel,
  ProductModel,
  OrderModel,
];

export async function createSequelizeInstance(options: any): Promise<Sequelize> {
  const sequelize = new Sequelize(options);
  sequelize.addModels(ALL_MODELS);

  ClientModel.hasMany(OrderModel, { foreignKey: 'clientId' });
  OrderModel.belongsTo(ClientModel, { foreignKey: 'clientId' });

  CollectionModel.hasMany(ProductModel, { foreignKey: 'collectionId' });
  ProductModel.belongsTo(CollectionModel, { foreignKey: 'collectionId' });

  return sequelize;
}
