import { Sequelize } from 'sequelize-typescript';
import { DatabaseDialect } from '../../../config/environment/env.interface.js';
export declare const ALL_MODELS: never[];
export declare function createSequelizeInstance(dialect: DatabaseDialect): Promise<Sequelize>;
