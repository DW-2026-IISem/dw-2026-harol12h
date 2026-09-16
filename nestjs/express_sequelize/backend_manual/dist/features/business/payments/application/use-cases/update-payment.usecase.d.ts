import { Payment } from '../../domain/entities/payment.entity.js';
import { IPaymentRepository } from '../../domain/interfaces/payment-repository.interface.js';
export declare class UpdatePaymentUseCase {
    private readonly repository;
    constructor(repository: IPaymentRepository);
    execute(payment: Payment): Promise<Payment>;
}
