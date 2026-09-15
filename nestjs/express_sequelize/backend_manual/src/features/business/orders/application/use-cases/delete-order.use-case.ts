import { Inject, Injectable } from '@nestjs/common';
import { OrderNotFoundException } from '../../domain/exceptions/order-not-found.exception.js';
import type { IOrderRepository } from '../../domain/interfaces/order-repository.interface.js';
import { ORDER_REPOSITORY } from '../../domain/interfaces/order-repository.interface.js';

@Injectable()
export class DeleteOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new OrderNotFoundException(id);
    await this.orderRepository.delete(id);
  }
}
