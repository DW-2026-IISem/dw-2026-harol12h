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
import { OrderDetailNotFoundException } from '../../domain/exceptions/order-detail-not-found.exception.js';
import { ORDER_DETAIL_REPOSITORY } from '../../domain/interfaces/order-detail-repository.interface.js';
import { OrderDetailMapper } from '../mappers/order-detail.mapper.js';
let UpdateOrderDetailUseCase = class UpdateOrderDetailUseCase {
    orderDetailRepository;
    constructor(orderDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
    }
    async execute(id, dto) {
        const detail = await this.orderDetailRepository.findById(id);
        if (!detail)
            throw new OrderDetailNotFoundException(id);
        if (dto.quantity !== undefined)
            detail.quantity = dto.quantity;
        if (dto.unitPrice !== undefined)
            detail.unitPrice = dto.unitPrice;
        const updated = await this.orderDetailRepository.update(detail);
        return OrderDetailMapper.toResponse(updated);
    }
};
UpdateOrderDetailUseCase = __decorate([
    Injectable(),
    __param(0, Inject(ORDER_DETAIL_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateOrderDetailUseCase);
export { UpdateOrderDetailUseCase };
//# sourceMappingURL=update-order-detail.use-case.js.map