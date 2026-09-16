import { Inject, Injectable } from '@nestjs/common';
import { OrderDetailNotFoundException } from '../../domain/exceptions/order-detail-not-found.exception.js';
import type { IOrderDetailRepository } from '../../domain/interfaces/order-detail-repository.interface.js';
import { ORDER_DETAIL_REPOSITORY } from '../../domain/interfaces/order-detail-repository.interface.js';
import { OrderDetailMapper } from '../mappers/order-detail.mapper.js';

@Injectable()
export class GetOrderDetailUseCase {
  constructor(
    @Inject(ORDER_DETAIL_REPOSITORY)
    private readonly orderDetailRepository: IOrderDetailRepository,
  ) {}

  async execute(id: number) {
    const detail = await this.orderDetailRepository.findById(id);
    if (!detail) throw new OrderDetailNotFoundException(id);
    return OrderDetailMapper.toResponse(detail);
  }
}
