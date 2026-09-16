import { Payment } from '../../domain/entities/payment.entity.js';
import { IPaymentRepository } from '../../domain/interfaces/payment-repository.interface.js';
export declare class PaymentService {
    private readonly repository;
    constructor(repository: IPaymentRepository);
    processPayment(payment: Payment): Promise<Payment>;
}
