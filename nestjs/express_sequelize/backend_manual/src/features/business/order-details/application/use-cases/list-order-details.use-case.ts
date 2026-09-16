import { Inject, Injectable } from '@nestjs/common';
import type { IOrderDetailRepository } from '../../domain/interfaces/order-detail-repository.interface.js';
import { ORDER_DETAIL_REPOSITORY } from '../../domain/interfaces/order-detail-repository.interface.js';
import { OrderDetailMapper } from '../mappers/order-detail.mapper.js';
import { OrderDetail } from '../../domain/entities/order-detail.entity.js';

@Injectable()
export class ListOrderDetailsUseCase {
  constructor(
    @Inject(ORDER_DETAIL_REPOSITORY)
    private readonly orderDetailRepository: IOrderDetailRepository,
  ) {}

  async execute(filter: { orderId?: number; page?: number; limit?: number }) {
    const result = await this.orderDetailRepository.findAll(filter);
    return {
      items: result.items.map((d: OrderDetail) => OrderDetailMapper.toResponse(d)),
      meta: result.meta,
    };
  }
}
