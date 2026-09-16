import { DatabaseDialect } from './env.interface.js';
export function resolveDialectCredentials() {
    const dialect = process.env.DB_DIALECT ?? DatabaseDialect.Postgres;
    const credentialsByDialect = {
        mysql: {
            host: process.env.DB_MYSQL_HOST ?? 'localhost',
            port: parseInt(process.env.DB_MYSQL_PORT ?? '3306', 10),
            username: process.env.DB_MYSQL_USERNAME ?? 'root',
            password: process.env.DB_MYSQL_PASSWORD ?? '',
            database: process.env.DB_MYSQL_NAME ?? 'testdb',
        },
        postgres: {
            host: process.env.DB_POSTGRES_HOST ?? 'localhost',
            port: parseInt(process.env.DB_POSTGRES_PORT ?? '5432', 10),
            username: process.env.DB_POSTGRES_USERNAME ?? 'postgres',
            password: process.env.DB_POSTGRES_PASSWORD ?? 'postgres',
            database: process.env.DB_POSTGRES_NAME ?? 'testdb',
        },
        mssql: {
            host: process.env.DB_MSSQL_HOST ?? 'localhost',
            port: parseInt(process.env.DB_MSSQL_PORT ?? '1433', 10),
            username: process.env.DB_MSSQL_USERNAME ?? 'sa',
            password: process.env.DB_MSSQL_PASSWORD ?? '',
            database: process.env.DB_MSSQL_NAME ?? 'testdb',
        },
        oracle: {
            host: process.env.DB_ORACLE_HOST ?? 'localhost',
            port: parseInt(process.env.DB_ORACLE_PORT ?? '1521', 10),
            username: process.env.DB_ORACLE_USERNAME ?? 'system',
            password: process.env.DB_ORACLE_PASSWORD ?? 'oracle',
            database: process.env.DB_ORACLE_NAME ?? 'testdb',
        },
    };
    if (dialect === DatabaseDialect.SQLite) {
        throw new Error('SQLite is not configured for this application');
    }
    const credentials = credentialsByDialect[dialect];
    return {
        dialect,
        ...credentials,
    };
}
//# sourceMappingURL=db-env.js.map