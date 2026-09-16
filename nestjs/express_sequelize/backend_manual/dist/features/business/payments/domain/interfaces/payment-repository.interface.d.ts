import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { Payment } from '../entities/payment.entity.js';
export declare const PAYMENT_REPOSITORY = "PAYMENT_REPOSITORY";
export interface PaymentFindAllParams {
    page?: number;
    limit?: number;
    orderId?: number;
    status?: string;
}
export interface IPaymentRepository {
    create(payment: Payment): Promise<Payment>;
    update(payment: Payment): Promise<Payment>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Payment | null>;
    findAll(params: PaymentFindAllParams): Promise<PaginatedResult<Payment>>;
}
