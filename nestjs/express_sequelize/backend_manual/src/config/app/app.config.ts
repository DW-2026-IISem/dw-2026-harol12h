export enum NodeEnvironment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export const APP_DEFAULTS = {
  NODE_ENV: NodeEnvironment.Development,
};

export const appConfig = () => ({
  nodeEnv: (process.env.NODE_ENV as NodeEnvironment) || APP_DEFAULTS.NODE_ENV,
});
