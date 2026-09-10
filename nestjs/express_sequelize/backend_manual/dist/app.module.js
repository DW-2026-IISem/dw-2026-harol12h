var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/environment/env.config.js';
import { appConfig } from './config/app/app.config.js';
import { jwtConfig } from './config/jwt/jwt.config.js';
import { LoggerModule } from './config/logger/logger.module.js';
import { SequelizeDatabaseModule } from './infrastructure/database/sequelize/sequelize.module.js';
import { SecurityModule } from './infrastructure/security/security.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({
                isGlobal: true,
                load: [envConfig, appConfig, jwtConfig],
                envFilePath: '.env',
            }),
            SequelizeDatabaseModule,
            SecurityModule,
            LoggerModule,
        ],
        controllers: [AppController],
        providers: [
            AppService,
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map