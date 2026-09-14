import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module.js';
import { CollectionsModule } from './collections/collections.module.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [
    ClientsModule,
    CollectionsModule,
    ProductsModule,
  ],
})
export class BusinessModule {}
