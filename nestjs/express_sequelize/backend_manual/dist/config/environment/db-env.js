import { DatabaseDialect } from './env.interface.js';
export function resolveDialectCredentials() {
    return {
        dialect: process.env.DB_DIALECT ?? DatabaseDialect.Postgres,
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USER ?? 'postgres',
        password: process.env.DB_PASS ?? 'postgres',
        database: process.env.DB_NAME ?? 'testdb',
    };
}
//# sourceMappingURL=db-env.js.map