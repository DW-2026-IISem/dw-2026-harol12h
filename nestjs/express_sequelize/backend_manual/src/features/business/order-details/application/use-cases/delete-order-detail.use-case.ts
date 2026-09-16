import { Inject, Injectable } from '@nestjs/common';
import { OrderDetailNotFoundException } from '../../domain/exceptions/order-detail-not-found.exception.js';
import type { IOrderDetailRepository } from '../../domain/interfaces/order-detail-repository.interface.js';
import { ORDER_DETAIL_REPOSITORY } from '../../domain/interfaces/order-detail-repository.interface.js';

@Injectable()
export class DeleteOrderDetailUseCase {
  constructor(
    @Inject(ORDER_DETAIL_REPOSITORY)
    private readonly orderDetailRepository: IOrderDetailRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const detail = await this.orderDetailRepository.findById(id);
    if (!detail) throw new OrderDetailNotFoundException(id);
    await this.orderDetailRepository.delete(id);
  }
}
