import { Sequelize } from 'sequelize-typescript';
import { DatabaseDialect } from '../../../config/environment/env.interface.js';
import { getSequelizeOptions } from './sequelize.options.js';
import { ClientModel } from '../../../features/business/clients/infrastructure/persistence/models/client.model.js';
import { CollectionModel } from '../../../features/business/collections/infrastructure/persistence/models/collection.model.js';
export const ALL_MODELS = [
    ClientModel,
    CollectionModel,
];
export async function createSequelizeInstance(dialect) {
    const options = getSequelizeOptions(dialect);
    let dialectModule;
    switch (dialect) {
        case DatabaseDialect.MySQL:
            dialectModule = (await import('mysql2')).default;
            break;
        case DatabaseDialect.Postgres:
            dialectModule = (await import('pg')).default;
            break;
        case DatabaseDialect.MSSQL:
            dialectModule = (await import('tedious')).default;
            break;
        case DatabaseDialect.Oracle:
            dialectModule = (await import('oracledb')).default;
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