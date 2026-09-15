import { Order } from '../../domain/entities/order.entity';
import { OrderResponseDto } from '../dto/order-response.dto';
import { OrderModel } from '../../infrastructure/persistence/models/order.model';

export class OrderMapper {
  static toDomain(model: OrderModel): Order {
    return Order.reconstitute({
      id: model.id,
      clientId: model.clientId,
      orderDate: model.orderDate,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Order): OrderResponseDto {
    return {
      id: entity.id!,
      clientId: entity.clientId,
      orderDate: entity.orderDate,
      status: entity.status,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Order): Partial<OrderModel> {
    return {
      id: entity.id,
      clientId: entity.clientId,
      orderDate: entity.orderDate,
      status: entity.status,
    };
  }
}
