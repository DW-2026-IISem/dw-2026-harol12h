var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ORDER_DETAIL_REPOSITORY } from './domain/interfaces/order-detail-repository.interface.js';
import { OrderDetailRepository } from './infrastructure/persistence/repositories/order-detail.repository.js';
import { CreateOrderDetailUseCase } from './application/use-cases/create-order-detail.use-case.js';
import { UpdateOrderDetailUseCase } from './application/use-cases/update-order-detail.use-case.js';
import { DeleteOrderDetailUseCase } from './application/use-cases/delete-order-detail.use-case.js';
import { GetOrderDetailUseCase } from './application/use-cases/get-order-detail.use-case.js';
import { ListOrderDetailsUseCase } from './application/use-cases/list-order-details.use-case.js';
import { OrderDetailsController } from './presentation/http/controllers/order-details.controller.js';
let OrderDetailsModule = class OrderDetailsModule {
};
OrderDetailsModule = __decorate([
    Module({
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
], OrderDetailsModule);
export { OrderDetailsModule };
//# sourceMappingURL=order-details.module.js.map