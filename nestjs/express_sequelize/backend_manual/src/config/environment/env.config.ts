import { resolveDialectCredentials } from './db-env.js';
import { Environment } from './env.interface.js';
import { validate } from './env.validation.js';

export const envConfig = () => {
  const validated = validate({
    APP_PORT: parseInt(process.env.APP_PORT ?? '3002', 10),
    DB_DIALECT: process.env.DB_DIALECT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT ?? '5432', 10),
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
  });

  const env: Environment = {
    app: {
      port: validated.APP_PORT,
    },
    db: resolveDialectCredentials(),
  };

  return env;
};
