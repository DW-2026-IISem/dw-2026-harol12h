import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../../domain/interfaces/order-repository.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderMapper } from '../mappers/order.mapper';

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
