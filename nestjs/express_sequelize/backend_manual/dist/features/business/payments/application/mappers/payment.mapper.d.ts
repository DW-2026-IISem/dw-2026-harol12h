import { Payment } from '../../domain/entities/payment.entity.js';
import { PaymentModel } from '../../infrastructure/persistence/models/payment.model.js';
export declare class PaymentMapper {
    static toDomain(model: PaymentModel): Payment;
    static toPersistence(entity: Payment): any;
}
