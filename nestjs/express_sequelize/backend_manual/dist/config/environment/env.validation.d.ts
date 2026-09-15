import { DatabaseDialect } from './env.interface.js';
declare class EnvironmentVariables {
    DB_DIALECT: DatabaseDialect;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    APP_PORT: number;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
