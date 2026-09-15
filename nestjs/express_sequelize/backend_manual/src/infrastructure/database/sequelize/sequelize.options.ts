import { resolveDialectCredentials } from '../../../config/environment/db-env.js';

export function getSequelizeOptions() {
  const credentials = resolveDialectCredentials();
  return {
    dialect: credentials.dialect,
    host: credentials.host,
    port: credentials.port,
    username: credentials.username,
    password: credentials.password,
    database: credentials.database,
    logging: false,
  };
}
