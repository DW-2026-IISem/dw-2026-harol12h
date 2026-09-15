import { Inject, Injectable } from '@nestjs/common';
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
    const existing = await this.orderRepository.findById(id);
    if (!existing) throw new Error(`Order ${id} not found`);

    const updated = await this.orderRepository.update({ ...existing.toJSON(), ...dto });
    return OrderMapper.toResponse(updated);
  }
}
