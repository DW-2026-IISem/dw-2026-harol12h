var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../../domain/interfaces/order-repository.interface.js';
import { OrderMapper } from '../mappers/order.mapper.js';
let GetOrderUseCase = class GetOrderUseCase {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(id) {
        const order = await this.orderRepository.findById(id);
        if (!order)
            throw new Error(`Order ${id} not found`);
        return OrderMapper.toResponse(order);
    }
};
GetOrderUseCase = __decorate([
    Injectable(),
    __param(0, Inject(ORDER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetOrderUseCase);
export { GetOrderUseCase };
//# sourceMappingURL=get-order.use-case.js.map