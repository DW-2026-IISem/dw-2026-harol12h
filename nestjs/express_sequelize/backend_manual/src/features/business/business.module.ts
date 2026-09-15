import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module.js';
import { CollectionsModule } from './collections/collections.module.js';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';

@Module({
  imports: [ClientsModule, CollectionsModule, ProductsModule, OrdersModule],
  exports: [ClientsModule, CollectionsModule, ProductsModule, OrdersModule],
})
export class BusinessModule {}
