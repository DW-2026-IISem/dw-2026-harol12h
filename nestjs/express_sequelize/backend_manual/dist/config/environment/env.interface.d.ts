export declare enum DatabaseDialect {
    Postgres = "postgres",
    MySQL = "mysql",
    SQLite = "sqlite",
    MSSQL = "mssql",
    Oracle = "oracle"
}
export interface DatabaseConfig {
    dialect: DatabaseDialect;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}
export interface Environment {
    app: {
        port: number;
    };
    db: DatabaseConfig;
}
