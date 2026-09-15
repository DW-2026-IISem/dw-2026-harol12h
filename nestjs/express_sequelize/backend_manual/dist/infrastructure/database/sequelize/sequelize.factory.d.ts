import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../../../features/business/clients/infrastructure/persistence/models/client.model.js';
import { CollectionModel } from '../../../features/business/collections/infrastructure/persistence/models/collection.model.js';
import { ProductModel } from '../../../features/business/products/infrastructure/persistence/models/product.model.js';
import { OrderModel } from '../../../features/business/orders/infrastructure/persistence/models/order.model.js';
export declare const ALL_MODELS: (typeof ClientModel | typeof CollectionModel | typeof ProductModel | typeof OrderModel)[];
export declare function createSequelizeInstance(options: any): Promise<Sequelize>;
