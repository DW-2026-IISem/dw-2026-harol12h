import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { CollectionsModule } from './collections/collections.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ClientsModule, CollectionsModule, ProductsModule, OrdersModule],
  exports: [ClientsModule, CollectionsModule, ProductsModule, OrdersModule],
})
export class BusinessModule {}
