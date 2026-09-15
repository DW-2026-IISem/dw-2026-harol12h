import { DatabaseDialect } from '../environment/env.interface.js';
import { resolveDialectCredentials } from '../environment/db-env.js';
const dialectModuleMap = {
    [DatabaseDialect.MySQL]: 'mysql2',
    [DatabaseDialect.Postgres]: 'pg',
    [DatabaseDialect.SQLite]: 'sqlite3',
    [DatabaseDialect.MSSQL]: 'tedious',
    [DatabaseDialect.Oracle]: 'oracledb',
};
export const databaseConfig = () => {
    const dialect = process.env.DB_DIALECT || DatabaseDialect.MySQL;
    const credentials = resolveDialectCredentials();
    return {
        dialectModule: dialectModuleMap[dialect],
        ...credentials,
    };
};
//# sourceMappingURL=database.config.js.map