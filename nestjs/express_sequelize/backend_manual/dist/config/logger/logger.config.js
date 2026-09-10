export function getLoggerConfig() {
    const isDev = process.env.NODE_ENV === 'development';
    return {
        logLevels: isDev
            ? ['log', 'error', 'warn', 'debug', 'verbose', 'fatal']
            : ['log', 'error', 'warn'],
    };
}
//# sourceMappingURL=logger.config.js.map