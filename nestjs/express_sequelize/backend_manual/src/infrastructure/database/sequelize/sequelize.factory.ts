import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../../../features/business/clients/infrastructure/persistence/models/client.model.js';
import { CollectionModel } from '../../../features/business/collections/infrastructure/persistence/models/collection.model.js';
import { ProductModel } from '../../../features/business/products/infrastructure/persistence/models/product.model.js';
import { OrderModel } from '../../../features/business/orders/infrastructure/persistence/models/order.model.js';
import { OrderDetailModel } from '../../../features/business/order-details/infrastructure/persistence/models/order-detail.model.js';
import { VariantModel } from '../../../features/business/variants/infrastructure/persistence/models/variant.model.js';
import { BranchModel } from '../../../features/business/branches/infrastructure/persistence/models/branch.model.js';

export const ALL_MODELS = [
  ClientModel,
  CollectionModel,
  ProductModel,
  OrderModel,
  OrderDetailModel,
  VariantModel,
  BranchModel
];

export async function createSequelizeInstance(options: any): Promise<Sequelize> {
  const sequelize = new Sequelize(options);
  sequelize.addModels(ALL_MODELS);

  ClientModel.hasMany(OrderModel, { foreignKey: 'clientId' });
  OrderModel.belongsTo(ClientModel, { foreignKey: 'clientId' });

  CollectionModel.hasMany(ProductModel, { foreignKey: 'collectionId' });
  ProductModel.belongsTo(CollectionModel, { foreignKey: 'collectionId' });

  ProductModel.hasMany(VariantModel, { foreignKey: 'productId' });
  VariantModel.belongsTo(ProductModel, { foreignKey: 'productId' });

  OrderModel.hasMany(OrderDetailModel, { foreignKey: 'orderId' });
  OrderDetailModel.belongsTo(OrderModel, { foreignKey: 'orderId' });

  ProductModel.hasMany(OrderDetailModel, { foreignKey: 'productId' });
  OrderDetailModel.belongsTo(ProductModel, { foreignKey: 'productId' });

  BranchModel.hasMany(ClientModel, { foreignKey: 'branchId' });
  ClientModel.belongsTo(BranchModel, { foreignKey: 'branchId' });

  return sequelize;
}
