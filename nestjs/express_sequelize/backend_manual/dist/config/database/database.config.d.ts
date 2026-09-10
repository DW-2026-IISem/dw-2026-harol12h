import { DatabaseDialect } from '../environment/env.interface.js';
export declare const DATABASE_CONFIG_NAME = "database";
export declare const databaseConfig: (() => {
    dialectModulePath: string;
    autoLoadModels: boolean;
    synchronize: boolean;
    logging: boolean | {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    dialect: DatabaseDialect;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    connectString?: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    dialectModulePath: string;
    autoLoadModels: boolean;
    synchronize: boolean;
    logging: boolean | {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    dialect: DatabaseDialect;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    connectString?: string;
}>;
