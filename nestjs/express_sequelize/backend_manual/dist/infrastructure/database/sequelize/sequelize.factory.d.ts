import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../../../features/business/products/infrastructure/persistence/models/product.model.js';
import { ProductTypeModel } from '../../../features/business/product-types/infrastructure/persistence/models/product-type.model.js';
import { OrderModel } from '../../../features/business/orders/infrastructure/persistence/models/order.model.js';
export declare const ALL_MODELS: (typeof ProductTypeModel | typeof ProductModel | typeof OrderModel)[];
export declare function createSequelizeInstance(options: any): Sequelize;
