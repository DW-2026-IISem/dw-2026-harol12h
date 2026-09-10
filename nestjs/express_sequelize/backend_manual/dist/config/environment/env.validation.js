var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min, validateSync, } from 'class-validator';
import { assertActiveDialectCredentials, resolveDialectCredentials, } from './db-env.js';
import { DatabaseDialect, Environment } from './env.interface.js';
export class EnvironmentVariables {
    NODE_ENV = Environment.Development;
    PORT = 3002;
    DB_DIALECT;
    DB_MYSQL_HOST;
    DB_MYSQL_PORT;
    DB_MYSQL_USERNAME;
    DB_MYSQL_PASSWORD;
    DB_MYSQL_NAME;
    DB_POSTGRES_HOST;
    DB_POSTGRES_PORT;
    DB_POSTGRES_USERNAME;
    DB_POSTGRES_PASSWORD;
    DB_POSTGRES_NAME;
    DB_MSSQL_HOST;
    DB_MSSQL_PORT;
    DB_MSSQL_USERNAME;
    DB_MSSQL_PASSWORD;
    DB_MSSQL_NAME;
    DB_ORACLE_HOST;
    DB_ORACLE_PORT;
    DB_ORACLE_USERNAME;
    DB_ORACLE_PASSWORD;
    DB_ORACLE_NAME;
    DB_ORACLE_CONNECT_STRING;
    JWT_SECRET;
    JWT_EXPIRES_IN = '1d';
    JWT_REFRESH_SECRET;
    JWT_REFRESH_EXPIRES_IN = '7d';
}
__decorate([
    IsEnum(Environment),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "NODE_ENV", void 0);
__decorate([
    IsNumber(),
    Min(0),
    Max(65535),
    IsOptional(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "PORT", void 0);
__decorate([
    IsEnum(DatabaseDialect),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_DIALECT", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_MYSQL_HOST", void 0);
__decorate([
    IsNumber(),
    IsOptional(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "DB_MYSQL_PORT", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_MYSQL_USERNAME", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_MYSQL_PASSWORD", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_MYSQL_NAME", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_POSTGRES_HOST", void 0);
__decorate([
    IsNumber(),
    IsOptional(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "DB_POSTGRES_PORT", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_POSTGRES_USERNAME", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_POSTGRES_PASSWORD", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_POSTGRES_NAME", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_MSSQL_HOST", void 0);
__decorate([
    IsNumber(),
    IsOptional(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "DB_MSSQL_PORT", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_MSSQL_USERNAME", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_MSSQL_PASSWORD", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_MSSQL_NAME", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_ORACLE_HOST", void 0);
__decorate([
    IsNumber(),
    IsOptional(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "DB_ORACLE_PORT", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_ORACLE_USERNAME", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_ORACLE_PASSWORD", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_ORACLE_NAME", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_ORACLE_CONNECT_STRING", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_SECRET", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_EXPIRES_IN", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_REFRESH_SECRET", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_REFRESH_EXPIRES_IN", void 0);
function formatValidationErrors(errors) {
    return errors
        .map((error) => {
        const constraints = error.constraints
            ? Object.values(error.constraints).join(', ')
            : 'valor inválido';
        return `${error.property}: ${constraints}`;
    })
        .join('; ');
}
export function validate(config) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
        exposeDefaultValues: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(`Error de configuración: variable(s) crítica(s) inválida(s) o ausente(s). ${formatValidationErrors(errors)}. Copia .env.example a .env y completa el bloque del motor elegido (DB_DIALECT).`);
    }
    assertActiveDialectCredentials(resolveDialectCredentials(validatedConfig));
    return validatedConfig;
}
//# sourceMappingURL=env.validation.js.map