import { Environment } from './env.interface.js';
export declare const ENV_CONFIG_NAME = "environment";
export declare const envConfig: (() => {
    app: {
        port: number;
        nodeEnv: Environment;
    };
    database: import("./env.interface.js").DatabaseConfig;
    jwt: {
        secret: string;
        expiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    app: {
        port: number;
        nodeEnv: Environment;
    };
    database: import("./env.interface.js").DatabaseConfig;
    jwt: {
        secret: string;
        expiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
}>;
