import { Payment } from '../../domain/entities/payment.entity.js';
import { IPaymentRepository } from '../../domain/interfaces/payment-repository.interface.js';
export declare class FindPaymentUseCase {
    private readonly repository;
    constructor(repository: IPaymentRepository);
    execute(id: number): Promise<Payment | null>;
}
