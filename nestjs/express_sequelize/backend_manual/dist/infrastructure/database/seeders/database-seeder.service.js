var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseSeederService_1;
import { Injectable, Logger } from '@nestjs/common';
let DatabaseSeederService = DatabaseSeederService_1 = class DatabaseSeederService {
    logger = new Logger(DatabaseSeederService_1.name);
    async onModuleInit() {
        if (process.env.NODE_ENV === 'production') {
            return;
        }
        try {
            this.logger.log('✅ Seeders ejecutados');
        }
        catch (error) {
            this.logger.error(`❌ Error en seeders: ${error.message}`, error.stack);
            throw error;
        }
    }
};
DatabaseSeederService = DatabaseSeederService_1 = __decorate([
    Injectable()
], DatabaseSeederService);
export { DatabaseSeederService };
//# sourceMappingURL=database-seeder.service.js.map