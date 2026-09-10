import { SequelizeOptions } from 'sequelize-typescript';
import { DatabaseDialect } from '../../../config/environment/env.interface.js';
export declare function getSequelizeOptions(dialect: DatabaseDialect): Partial<SequelizeOptions>;
