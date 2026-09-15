export var NodeEnvironment;
(function (NodeEnvironment) {
    NodeEnvironment["Development"] = "development";
    NodeEnvironment["Production"] = "production";
    NodeEnvironment["Test"] = "test";
})(NodeEnvironment || (NodeEnvironment = {}));
export const APP_DEFAULTS = {
    NODE_ENV: NodeEnvironment.Development,
};
export const appConfig = () => ({
    nodeEnv: process.env.NODE_ENV || APP_DEFAULTS.NODE_ENV,
});
//# sourceMappingURL=app.config.js.map