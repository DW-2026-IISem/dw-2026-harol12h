import { Module } from '@nestjs/common';
import { ORDER_DETAIL_REPOSITORY } from './domain/interfaces/order-detail-repository.interface.js';
import { OrderDetailRepository } from './infrastructure/persistence/repositories/order-detail.repository.js';
import { CreateOrderDetailUseCase } from './application/use-cases/create-order-detail.use-case.js';
import { UpdateOrderDetailUseCase } from './application/use-cases/update-order-detail.use-case.js';
import { DeleteOrderDetailUseCase } from './application/use-cases/delete-order-detail.use-case.js';
import { GetOrderDetailUseCase } from './application/use-cases/get-order-detail.use-case.js';
import { ListOrderDetailsUseCase } from './application/use-cases/list-order-details.use-case.js';
import { OrderDetailsController } from './presentation/http/controllers/order-details.controller.js';

@Module({
  controllers: [OrderDetailsController],
  providers: [
    OrderDetailRepository,
    { provide: ORDER_DETAIL_REPOSITORY, useExisting: OrderDetailRepository },
    CreateOrderDetailUseCase,
    UpdateOrderDetailUseCase,
    DeleteOrderDetailUseCase,
    GetOrderDetailUseCase,
    ListOrderDetailsUseCase,
  ],
  exports: [ORDER_DETAIL_REPOSITORY],
})
export class OrderDetailsModule {}
