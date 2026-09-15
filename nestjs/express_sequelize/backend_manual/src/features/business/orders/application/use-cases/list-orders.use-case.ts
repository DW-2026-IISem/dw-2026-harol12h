import { Inject, Injectable } from '@nestjs/common';
import type { IOrderRepository } from '../../domain/interfaces/order-repository.interface.js';
import { ORDER_REPOSITORY } from '../../domain/interfaces/order-repository.interface.js';
import { OrderFilterDto } from '../dto/order-filter.dto.js';
import { OrderMapper } from '../mappers/order.mapper.js';
import { Order } from '../../domain/entities/order.entity.js';

@Injectable()
export class ListOrdersUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(filter: OrderFilterDto) {
    const result = await this.orderRepository.findAll(filter);
    return {
      items: result.items.map((o: Order) => OrderMapper.toResponse(o)),
      meta: result.meta,
    };
  }
}
