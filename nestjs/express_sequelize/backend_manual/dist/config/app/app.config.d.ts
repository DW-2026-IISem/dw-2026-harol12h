import { Environment } from '../environment/env.interface.js';
export declare const appConfig: (() => {
    port: number;
    nodeEnv: Environment;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    nodeEnv: Environment;
}>;
