import { Order } from '../../../domain/entities/order.entity.js';
import { OrderResponseDto } from '../../../application/dto/order-response.dto.js';
import { OrderMapper } from '../../../application/mappers/order.mapper.js';

export class OrderSerializer {
  static serialize(entity: Order): OrderResponseDto {
    return OrderMapper.toResponse(entity);
  }
}
