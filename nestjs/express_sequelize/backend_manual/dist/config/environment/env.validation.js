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
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { DatabaseDialect } from './env.interface.js';
class EnvironmentVariables {
    DB_DIALECT;
    DB_HOST;
    DB_PORT;
    DB_USER;
    DB_PASS;
    DB_NAME;
    APP_PORT;
}
__decorate([
    IsEnum(DatabaseDialect),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_DIALECT", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_HOST", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "DB_PORT", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_USER", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_PASS", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_NAME", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "APP_PORT", void 0);
export function validate(config) {
    const validated = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    return validated;
}
//# sourceMappingURL=env.validation.js.map