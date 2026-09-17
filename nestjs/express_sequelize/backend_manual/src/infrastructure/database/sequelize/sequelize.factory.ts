import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../../../features/business/clients/infrastructure/persistence/models/client.model.js';
import { CollectionModel } from '../../../features/business/collections/infrastructure/persistence/models/collection.model.js';
import { ProductModel } from '../../../features/business/products/infrastructure/persistence/models/product.model.js';
import { OrderModel } from '../../../features/business/orders/infrastructure/persistence/models/order.model.js';
import { OrderDetailModel } from '../../../features/business/order-details/infrastructure/persistence/models/order-detail.model.js';
import { VariantModel } from '../../../features/business/variants/infrastructure/persistence/models/variant.model.js';
import { BranchModel } from '../../../features/business/branches/infrastructure/persistence/models/branch.model.js';
import { InventoryModel } from '../../../features/business/inventory/infrastructure/persistence/models/inventory.model.js';
import { ProductTypeModel } from '../../../features/business/product-types/infrastructure/persistence/models/product-type.model.js';
import { PaymentModel } from '../../../features/business/payments/infrastructure/persistence/models/payment.model.js';
import { ReturnModel } from '../../../features/business/returns/infrastructure/persistence/models/return.model.js';
import { ReturnDetailModel } from '../../../features/business/return-details/infrastructure/persistence/models/return-detail.model.js';
import { PromotionModel } from '../../../features/business/promotions/infrastructure/persistence/models/promotion.model.js';

export const ALL_MODELS = [
  ClientModel,
  CollectionModel,
  ProductTypeModel,
  ProductModel,
  OrderModel,
  OrderDetailModel,
  VariantModel,
  BranchModel,
  InventoryModel,
  PaymentModel,
  ReturnModel,
  ReturnDetailModel,
  PromotionModel,
];

export async function createSequelizeInstance(options: any): Promise<Sequelize> {
  const sequelize = new Sequelize(options);
  sequelize.addModels(ALL_MODELS);

  ClientModel.hasMany(OrderModel, { foreignKey: 'clientId' });
  OrderModel.belongsTo(ClientModel, { foreignKey: 'clientId' });
  OrderModel.hasMany(PaymentModel, { foreignKey: 'orderId' });
  PaymentModel.belongsTo(OrderModel, { foreignKey: 'orderId' });
  OrderModel.hasMany(ReturnModel, { foreignKey: 'orderId' });
  ReturnModel.belongsTo(OrderModel, { foreignKey: 'orderId' });
  ReturnModel.hasMany(ReturnDetailModel, { foreignKey: 'returnId' });
  ReturnDetailModel.belongsTo(ReturnModel, { foreignKey: 'returnId' });

  CollectionModel.hasMany(ProductModel, { foreignKey: 'collectionId' });
  ProductModel.belongsTo(CollectionModel, { foreignKey: 'collectionId' });

  ProductModel.hasMany(VariantModel, { foreignKey: 'productId' });
  VariantModel.belongsTo(ProductModel, { foreignKey: 'productId' });
  ProductModel.hasMany(ReturnDetailModel, { foreignKey: 'productId' });
  ReturnDetailModel.belongsTo(ProductModel, { foreignKey: 'productId' });

  OrderModel.hasMany(OrderDetailModel, { foreignKey: 'orderId' });
  OrderDetailModel.belongsTo(OrderModel, { foreignKey: 'orderId' });

  ProductModel.hasMany(OrderDetailModel, { foreignKey: 'productId' });
  OrderDetailModel.belongsTo(ProductModel, { foreignKey: 'productId' });

  BranchModel.hasMany(ClientModel, { foreignKey: 'branchId' });
  ClientModel.belongsTo(BranchModel, { foreignKey: 'branchId' });

  InventoryModel.belongsTo(BranchModel, { foreignKey: 'branchId' });
  InventoryModel.belongsTo(VariantModel, { foreignKey: 'variantId' });

  return sequelize;
}
