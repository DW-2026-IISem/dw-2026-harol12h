import { OrderDetail } from '../../domain/entities/order-detail.entity.js';
import { OrderDetailModel } from '../../infrastructure/persistence/models/order-detail.model.js';

export class OrderDetailMapper {
  static toDomain(model: OrderDetailModel): OrderDetail {
    return OrderDetail.reconstitute({
      id: model.id,
      orderId: model.orderId,
      productId: model.productId,
      quantity: model.quantity,
      unitPrice: model.unitPrice,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: OrderDetail) {
    return {
      id: entity.id!,
      orderId: entity.orderId,
      productId: entity.productId,
      quantity: entity.quantity,
      unitPrice: entity.unitPrice,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: OrderDetail): Partial<OrderDetailModel> {
    return {
      id: entity.id,
      orderId: entity.orderId,
      productId: entity.productId,
      quantity: entity.quantity,
      unitPrice: entity.unitPrice,
    };
  }
}
