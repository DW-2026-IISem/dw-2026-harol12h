import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module.js';
import { CollectionsModule } from './collections/collections.module.js';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { OrderDetailsModule } from './order-details/order-details.module.js';
import { VariantsModule } from './variants/variants.module.js';
import { BranchesModule } from './branches/branches.module.js';
import { InventoryModule } from './inventory/inventory.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { ReturnsModule } from './returns/returns.module.js';
import { ReturnDetailsModule } from './return-details/return-details.module.js';


@Module({
  imports: [
    ClientsModule,
    CollectionsModule,
    ProductsModule,
    OrdersModule,
    OrderDetailsModule,
    VariantsModule,
    BranchesModule,
    InventoryModule,
    PaymentsModule,
    ReturnsModule,
    ReturnDetailsModule,
  ],
  exports: [
    ClientsModule,
    CollectionsModule,
    ProductsModule,
    OrdersModule,
    OrderDetailsModule,
    VariantsModule,
    BranchesModule,
    InventoryModule,
    PaymentsModule,
    ReturnsModule,
    ReturnDetailsModule,
  ],
})
export class BusinessModule {}