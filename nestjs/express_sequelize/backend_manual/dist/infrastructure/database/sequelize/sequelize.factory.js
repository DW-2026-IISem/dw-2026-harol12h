import { Sequelize } from 'sequelize-typescript';
import { DatabaseDialect } from '../../../config/environment/env.interface.js';
import { getSequelizeOptions } from './sequelize.options.js';
export const ALL_MODELS = [];
export async function createSequelizeInstance(dialect) {
    const options = getSequelizeOptions(dialect);
    let dialectModule;
    switch (dialect) {
        case DatabaseDialect.MySQL:
            dialectModule = require('mysql2');
            break;
        case DatabaseDialect.Postgres:
            dialectModule = require('pg');
            break;
        case DatabaseDialect.MSSQL:
            dialectModule = require('tedious');
            break;
        case DatabaseDialect.Oracle:
            dialectModule = require('oracledb');
            break;
        default:
            throw new Error(`Dialecto no soportado: ${dialect}`);
    }
    const sequelize = new Sequelize({
        ...options,
        dialectModule,
        models: ALL_MODELS,
    });
    try {
        await sequelize.authenticate();
        console.log(`✅ Conexión exitosa a ${dialect.toUpperCase()}`);
    }
    catch (error) {
        console.error(`❌ Error conectando a ${dialect.toUpperCase()}:`, error.message);
        throw error;
    }
    if (process.env.NODE_ENV !== 'production') {
        await sequelize.sync({ alter: false });
        console.log('✅ Tablas sincronizadas');
    }
    return sequelize;
}
//# sourceMappingURL=sequelize.factory.js.map