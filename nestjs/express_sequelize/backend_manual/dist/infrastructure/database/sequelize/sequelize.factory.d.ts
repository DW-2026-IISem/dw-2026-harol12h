import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../../../features/business/clients/infrastructure/persistence/models/client.model.js';
import { CollectionModel } from '../../../features/business/collections/infrastructure/persistence/models/collection.model.js';
import { ProductModel } from '../../../features/business/products/infrastructure/persistence/models/product.model.js';
import { OrderModel } from '../../../features/business/orders/infrastructure/persistence/models/order.model.js';
import { OrderDetailModel } from '../../../features/business/order-details/infrastructure/persistence/models/order-detail.model.js';
export declare const ALL_MODELS: (typeof InventoryModel | typeof ClientModel | typeof CollectionModel | typeof ProductModel | typeof OrderModel | typeof OrderDetailModel)[];
export declare function createSequelizeInstance(options: any): Promise<Sequelize>;
import { InventoryModel } from '../../../features/business/inventory/infrastructure/persistence/models/inventory.model.js';
