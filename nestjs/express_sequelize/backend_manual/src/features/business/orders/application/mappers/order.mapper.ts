import { Order } from '../../domain/entities/order.entity.js';
import { OrderModel } from '../../infrastructure/persistence/models/order.model.js';

export class OrderMapper {
  static toEntity(model: OrderModel): Order {
    return new Order(model.id, model.clientId, model.orderDate, model.status);
  }

  static toResponse(model: OrderModel) {
    return {
      id: model.id,
      clientId: model.clientId,
      orderDate: model.orderDate,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }
}
