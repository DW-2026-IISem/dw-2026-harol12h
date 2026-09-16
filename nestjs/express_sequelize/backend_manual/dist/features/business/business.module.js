var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module.js';
import { CollectionsModule } from './collections/collections.module.js';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { OrderDetailsModule } from './order-details/order-details.module.js';
import { VariantsModule } from './variants/variants.module.js';
import { BranchesModule } from './branches/branches.module.js';
import { InventoryModule } from './inventory/inventory.module.js';
let BusinessModule = class BusinessModule {
};
BusinessModule = __decorate([
    Module({
        imports: [
            ClientsModule,
            CollectionsModule,
            ProductsModule,
            OrdersModule,
            OrderDetailsModule,
            VariantsModule,
            BranchesModule,
            InventoryModule,
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
        ],
    })
], BusinessModule);
export { BusinessModule };
//# sourceMappingURL=business.module.js.map