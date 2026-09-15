import { Inject, Injectable } from '@nestjs/common';
import { OrderNotFoundException } from '../../domain/exceptions/order-not-found.exception';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../../domain/interfaces/order-repository.interface';
import { OrderMapper } from '../mappers/order.mapper';

@Injectable()
export class GetOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(id: number) {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new OrderNotFoundException(id);
    return OrderMapper.toResponse(order);
  }
}
