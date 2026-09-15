var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { OrdersController } from './infrastructure/controllers/orders.controller.js';
import { OrderRepository } from './infrastructure/persistence/repositories/order.repository.js';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case.js';
import { GetOrderUseCase } from './application/use-cases/get-order.use-case.js';
import { ListOrdersUseCase } from './application/use-cases/list-orders.use-case.js';
import { UpdateOrderUseCase } from './application/use-cases/update-order.use-case.js';
import { DeleteOrderUseCase } from './application/use-cases/delete-order.use-case.js';
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    Module({
        controllers: [OrdersController],
        providers: [
            OrderRepository,
            CreateOrderUseCase,
            GetOrderUseCase,
            ListOrdersUseCase,
            UpdateOrderUseCase,
            DeleteOrderUseCase,
        ],
    })
], OrdersModule);
export { OrdersModule };
//# sourceMappingURL=orders.module.js.map