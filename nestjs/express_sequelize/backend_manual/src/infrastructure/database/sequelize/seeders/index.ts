import { seedClients } from '../../../../features/business/clients/infrastructure/persistence/seeders/clients.seeder.js';
import { seedCollections } from '../../../../features/business/collections/infrastructure/persistence/seeders/collections.seeder.js';
import { seedProducts } from '../../../../features/business/products/infrastructure/persistence/seeders/products.seeder.js';

export async function runSeeders() {
  await seedClients();
  await seedCollections();
  await seedProducts(); // ✅ nuevo
}
