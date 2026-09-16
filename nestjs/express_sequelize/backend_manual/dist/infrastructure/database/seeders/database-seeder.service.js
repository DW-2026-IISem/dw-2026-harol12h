var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { seedClients } from '../../../features/business/clients/infrastructure/persistence/seeders/clients.seeder.js';
import { seedCollections } from '../../../features/business/collections/infrastructure/persistence/seeders/collections.seeder.js';
import { seedProducts } from '../../../features/business/products/infrastructure/persistence/seeders/products.seeder.js';
import { seedOrders } from '../../../features/business/orders/infrastructure/persistence/seeders/orders.seeder.js';
import { seedOrderDetails } from '../../../features/business/order-details/infrastructure/persistence/seeders/order-details.seeder.js';
import { seedVariants } from '../../../features/business/variants/infrastructure/persistence/seeders/variants.seeder.js';
import { seedInventory } from '../../../features/business/inventory/infrastructure/persistence/seeders/inventory.seeder.js';
let DatabaseSeederService = class DatabaseSeederService {
    async runAllSeeders() {
        await seedClients();
        await seedCollections();
        await seedProducts();
        await seedOrders();
        await seedOrderDetails();
        await seedVariants();
        await seedInventory();
    }
};
DatabaseSeederService = __decorate([
    Injectable()
], DatabaseSeederService);
export { DatabaseSeederService };
//# sourceMappingURL=database-seeder.service.js.map