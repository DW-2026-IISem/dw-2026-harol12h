export var Environment;
(function (Environment) {
    Environment["Development"] = "development";
    Environment["Production"] = "production";
    Environment["Test"] = "test";
})(Environment || (Environment = {}));
export var DatabaseDialect;
(function (DatabaseDialect) {
    DatabaseDialect["MySQL"] = "mysql";
    DatabaseDialect["Postgres"] = "postgres";
    DatabaseDialect["MSSQL"] = "mssql";
    DatabaseDialect["Oracle"] = "oracle";
})(DatabaseDialect || (DatabaseDialect = {}));
//# sourceMappingURL=env.interface.js.map