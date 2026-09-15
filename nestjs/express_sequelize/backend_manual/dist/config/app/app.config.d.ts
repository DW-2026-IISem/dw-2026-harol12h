export declare enum NodeEnvironment {
    Development = "development",
    Production = "production",
    Test = "test"
}
export declare const APP_DEFAULTS: {
    NODE_ENV: NodeEnvironment;
};
export declare const appConfig: () => {
    nodeEnv: NodeEnvironment;
};
