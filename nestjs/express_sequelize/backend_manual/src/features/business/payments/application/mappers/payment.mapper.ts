import { Payment } from '../../domain/entities/payment.entity.js';
import { PaymentModel } from '../../infrastructure/persistence/models/payment.model.js';

export class PaymentMapper {
  static toDomain(model: PaymentModel): Payment {
    return Payment.reconstitute({
      id: model.id,
      orderId: model.orderId,
      method: model.method,
      amount: model.amount,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toPersistence(entity: Payment): any {
    return {
      id: entity.id,
      orderId: entity.orderId,
      method: entity.method,
      amount: entity.amount,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
