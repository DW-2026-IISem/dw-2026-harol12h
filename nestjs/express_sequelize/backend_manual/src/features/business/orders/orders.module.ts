import { Module } from '@nestjs/common';
import { ORDER_REPOSITORY } from './domain/interfaces/order-repository.interface';
import { OrderRepository } from './infrastructure/persistence/repositories/order.repository';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { UpdateOrderUseCase } from './application/use-cases/update-order.use-case';
import { DeleteOrderUseCase } from './application/use-cases/delete-order.use-case';
import { GetOrderUseCase } from './application/use-cases/get-order.use-case';
import { ListOrdersUseCase } from './application/use-cases/list-orders.use-case';
import { OrdersController } from './presentation/http/controllers/orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [
    OrderRepository,
    { provide: ORDER_REPOSITORY, useExisting: OrderRepository },
    CreateOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    GetOrderUseCase,
    ListOrdersUseCase,
  ],
  exports: [ORDER_REPOSITORY],
})
export class OrdersModule {}
