import { resolveDialectCredentials } from '../../../config/environment/db-env.js';
import { DatabaseDialect } from '../../../config/environment/env.interface.js';
export function getSequelizeOptions(dialect) {
    const credentials = resolveDialectCredentials({
        DB_DIALECT: dialect,
        ...process.env,
    });
    const base = {
        dialect: dialect,
        host: credentials.host,
        port: credentials.port,
        username: credentials.username,
        password: credentials.password,
        database: credentials.database,
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        define: {
            underscored: false,
            freezeTableName: true,
        },
    };
    switch (dialect) {
        case DatabaseDialect.MSSQL:
            return {
                ...base,
                dialectOptions: {
                    options: {
                        encrypt: true,
                        trustServerCertificate: true,
                    },
                },
            };
        case DatabaseDialect.Oracle:
            return {
                ...base,
                dialectOptions: {
                    connectString: credentials.connectString,
                },
            };
        default:
            return base;
    }
}
//# sourceMappingURL=sequelize.options.js.map