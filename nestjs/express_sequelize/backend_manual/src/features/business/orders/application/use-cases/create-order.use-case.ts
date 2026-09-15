import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity.js';
import type { IOrderRepository } from '../../domain/interfaces/order-repository.interface.js';
import { ORDER_REPOSITORY } from '../../domain/interfaces/order-repository.interface.js';
import { CreateOrderDto } from '../dto/create-order.dto.js';
import { OrderMapper } from '../mappers/order.mapper.js';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(dto: CreateOrderDto) {
    const order = Order.create(dto);
    const created = await this.orderRepository.create(order);
    return OrderMapper.toResponse(created);
  }
}
