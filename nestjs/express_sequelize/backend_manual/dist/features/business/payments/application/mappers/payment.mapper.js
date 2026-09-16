import { Payment } from '../../domain/entities/payment.entity.js';
export class PaymentMapper {
    static toDomain(model) {
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
    static toPersistence(entity) {
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
//# sourceMappingURL=payment.mapper.js.map