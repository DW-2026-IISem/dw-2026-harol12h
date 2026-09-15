import { Inject, Injectable } from '@nestjs/common';
import { OrderNotFoundException } from '../../domain/exceptions/order-not-found.exception.js';
import type { IOrderRepository } from '../../domain/interfaces/order-repository.interface.js';
import { ORDER_REPOSITORY } from '../../domain/interfaces/order-repository.interface.js';
import { UpdateOrderDto } from '../dto/update-order.dto.js';
import { OrderMapper } from '../mappers/order.mapper.js';

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(id: number, dto: UpdateOrderDto) {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new OrderNotFoundException(id);

    if (dto.status) order.updateStatus(dto.status);
    const updated = await this.orderRepository.update(order);
    return OrderMapper.toResponse(updated);
  }
}
