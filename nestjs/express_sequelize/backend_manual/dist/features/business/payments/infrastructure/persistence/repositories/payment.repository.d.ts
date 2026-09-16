import { Payment } from '../../../domain/entities/payment.entity.js';
import type { IPaymentRepository, PaymentFindAllParams } from '../../../domain/interfaces/payment-repository.interface.js';
export declare class PaymentRepository implements IPaymentRepository {
    create(payment: Payment): Promise<Payment>;
    update(payment: Payment): Promise<Payment>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Payment | null>;
    findAll(params: PaymentFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<Payment>>;
}
