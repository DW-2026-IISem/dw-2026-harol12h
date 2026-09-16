import { Payment } from '../../domain/entities/payment.entity.js';
import { IPaymentRepository } from '../../domain/interfaces/payment-repository.interface.js';
export declare class CreatePaymentUseCase {
    private readonly repository;
    constructor(repository: IPaymentRepository);
    execute(props: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment>;
}
