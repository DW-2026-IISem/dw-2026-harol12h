import { Order } from '../../../domain/entities/order.entity';
import { OrderResponseDto } from '../../../application/dto/order-response.dto';
import { OrderMapper } from '../../../application/mappers/order.mapper';

export class OrderSerializer {
  static serialize(entity: Order): OrderResponseDto {
    return OrderMapper.toResponse(entity);
  }
}
