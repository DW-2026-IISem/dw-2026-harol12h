import { Injectable } from '@nestjs/common';
import { seedClients } from '../../../features/business/clients/infrastructure/persistence/seeders/clients.seeder.js';
import { seedCollections } from '../../../features/business/collections/infrastructure/persistence/seeders/collections.seeder.js';
import { seedProducts } from '../../../features/business/products/infrastructure/persistence/seeders/products.seeder.js';
import { seedOrders } from '../../../features/business/orders/infrastructure/persistence/seeders/orders.seeder.js';
import { seedOrderDetails } from '../../../features/business/order-details/infrastructure/persistence/seeders/order-details.seeder.js';
import { seedVariants } from '../../../features/business/variants/infrastructure/persistence/seeders/variants.seeder.js';

@Injectable()
export class DatabaseSeederService {
  async runAllSeeders(): Promise<void> {
    await seedClients();
    await seedCollections();
    await seedProducts();
    await seedOrders();
    await seedOrderDetails();
    await seedVariants();
  }
}
