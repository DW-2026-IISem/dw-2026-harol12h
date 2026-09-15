import { Module } from '@nestjs/common';
import { OrdersController } from './infrastructure/controllers/orders.controller.js';
import { OrderRepository } from './infrastructure/persistence/repositories/order.repository.js';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case.js';
import { GetOrderUseCase } from './application/use-cases/get-order.use-case.js';
import { ListOrdersUseCase } from './application/use-cases/list-orders.use-case.js';
import { UpdateOrderUseCase } from './application/use-cases/update-order.use-case.js';

@Module({
  controllers: [OrdersController],
  providers: [
    OrderRepository,
    CreateOrderUseCase,
    GetOrderUseCase,
    ListOrdersUseCase,
    UpdateOrderUseCase,
  ],
})
export class OrdersModule {}
