import { seedClients } from '../../../../features/business/clients/infrastructure/persistence/seeders/clients.seeder.js';
import { seedCollections } from '../../../../features/business/collections/infrastructure/persistence/seeders/collections.seeder.js';
import { seedProducts } from '../../../../features/business/products/infrastructure/persistence/seeders/products.seeder.js';
import { seedOrders } from '../../../../features/business/orders/infrastructure/persistence/seeders/orders.seeder.js';
export async function runSeeders() {
    await seedClients();
    await seedCollections();
    await seedProducts();
    await seedOrders();
}
//# sourceMappingURL=index.js.map