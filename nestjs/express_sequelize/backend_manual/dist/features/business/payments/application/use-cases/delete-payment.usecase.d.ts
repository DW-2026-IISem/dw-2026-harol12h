import { IPaymentRepository } from '../../domain/interfaces/payment-repository.interface.js';
export declare class DeletePaymentUseCase {
    private readonly repository;
    constructor(repository: IPaymentRepository);
    execute(id: number): Promise<void>;
}
