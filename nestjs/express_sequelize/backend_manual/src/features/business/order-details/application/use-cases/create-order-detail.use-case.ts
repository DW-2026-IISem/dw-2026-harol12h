import { Inject, Injectable } from '@nestjs/common';
import { OrderDetail } from '../../domain/entities/order-detail.entity.js';
import type { IOrderDetailRepository } from '../../domain/interfaces/order-detail-repository.interface.js';
import { ORDER_DETAIL_REPOSITORY } from '../../domain/interfaces/order-detail-repository.interface.js';
import { OrderDetailMapper } from '../mappers/order-detail.mapper.js';

@Injectable()
export class CreateOrderDetailUseCase {
  constructor(
    @Inject(ORDER_DETAIL_REPOSITORY)
    private readonly orderDetailRepository: IOrderDetailRepository,
  ) {}

  async execute(dto: { orderId: number; productId: number; quantity: number; unitPrice: number }) {
    const detail = OrderDetail.create(dto);
    const created = await this.orderDetailRepository.create(detail);
    return OrderDetailMapper.toResponse(created);
  }
}
