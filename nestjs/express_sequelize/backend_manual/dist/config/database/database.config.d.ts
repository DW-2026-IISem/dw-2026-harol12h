import { DatabaseDialect } from '../environment/env.interface.js';
export declare const databaseConfig: () => {
    dialect: DatabaseDialect;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    dialectModule: string;
};
