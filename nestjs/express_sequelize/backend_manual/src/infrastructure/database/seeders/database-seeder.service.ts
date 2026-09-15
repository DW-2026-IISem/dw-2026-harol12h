import { Injectable } from '@nestjs/common';
import { seedClients } from '../../../features/business/clients/infrastructure/persistence/seeders/clients.seeder';
import { seedCollections } from '../../../features/business/collections/infrastructure/persistence/seeders/collections.seeder';
import { seedProducts } from '../../../features/business/products/infrastructure/persistence/seeders/products.seeder';
import { seedOrders } from '../../../features/business/orders/infrastructure/persistence/seeders/orders.seeder';

@Injectable()
export class DatabaseSeederService {
  async runAllSeeders(): Promise<void> {
    await seedClients();
    await seedCollections();
    await seedProducts();
    await seedOrders();
  }
}
