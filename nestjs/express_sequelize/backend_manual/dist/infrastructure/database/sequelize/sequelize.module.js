var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseDialect } from '../../../config/environment/env.interface.js';
import { SEQUELIZE_TOKEN } from '../../../common/constants/database.constants.js';
import { createSequelizeInstance } from './sequelize.factory.js';
import { DatabaseSeederService } from '../seeders/database-seeder.service.js';
let SequelizeDatabaseModule = class SequelizeDatabaseModule {
};
SequelizeDatabaseModule = __decorate([
    Global(),
    Module({
        providers: [
            {
                provide: SEQUELIZE_TOKEN,
                useFactory: async (configService) => {
                    const dialect = configService.get('environment.database.dialect', DatabaseDialect.MySQL);
                    return createSequelizeInstance(dialect);
                },
                inject: [ConfigService],
            },
            DatabaseSeederService,
        ],
        exports: [SEQUELIZE_TOKEN],
    })
], SequelizeDatabaseModule);
export { SequelizeDatabaseModule };
//# sourceMappingURL=sequelize.module.js.map