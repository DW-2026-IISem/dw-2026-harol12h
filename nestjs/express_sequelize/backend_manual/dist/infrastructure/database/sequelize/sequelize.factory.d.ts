import { Sequelize } from 'sequelize-typescript';
import { DatabaseDialect } from '../../../config/environment/env.interface.js';
import { ClientModel } from '../../../features/business/clients/infrastructure/persistence/models/client.model.js';
import { CollectionModel } from '../../../features/business/collections/infrastructure/persistence/models/collection.model.js';
export declare const ALL_MODELS: (typeof ClientModel | typeof CollectionModel)[];
export declare function createSequelizeInstance(dialect: DatabaseDialect): Promise<Sequelize>;
