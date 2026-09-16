import { Inject, Injectable } from '@nestjs/common';
import { OrderDetailNotFoundException } from '../../domain/exceptions/order-detail-not-found.exception.js';
import type { IOrderDetailRepository } from '../../domain/interfaces/order-detail-repository.interface.js';
import { ORDER_DETAIL_REPOSITORY } from '../../domain/interfaces/order-detail-repository.interface.js';
import { OrderDetailMapper } from '../mappers/order-detail.mapper.js';

@Injectable()
export class UpdateOrderDetailUseCase {
  constructor(
    @Inject(ORDER_DETAIL_REPOSITORY)
    private readonly orderDetailRepository: IOrderDetailRepository,
  ) {}

  async execute(id: number, dto: Partial<{ quantity: number; unitPrice: number }>) {
    const detail = await this.orderDetailRepository.findById(id);
    if (!detail) throw new OrderDetailNotFoundException(id);

    if (dto.quantity !== undefined) detail.quantity = dto.quantity;
    if (dto.unitPrice !== undefined) detail.unitPrice = dto.unitPrice;

    const updated = await this.orderDetailRepository.update(detail);
    return OrderDetailMapper.toResponse(updated);
  }
}
