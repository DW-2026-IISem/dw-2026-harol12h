import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module.js';
import { CollectionsModule } from './collections/collections.module.js';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { OrderDetailsModule } from './order-details/order-details.module.js';
import { VariantsModule } from './variants/variants.module.js';
import { BranchesModule } from './branches/branches.module.js';

@Module({
  imports: [
    ClientsModule,
    CollectionsModule,
    ProductsModule,
    OrdersModule,
    OrderDetailsModule,
    VariantsModule,
    BranchesModule,
  ],
  exports: [
    ClientsModule,
    CollectionsModule,
    ProductsModule,
    OrdersModule,
    OrderDetailsModule,
    VariantsModule,
    BranchesModule,
  ],
})
export class BusinessModule {}