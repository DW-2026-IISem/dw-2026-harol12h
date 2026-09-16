import { IPaymentRepository, PaymentFindAllParams } from '../../domain/interfaces/payment-repository.interface.js';
export declare class ListPaymentsUseCase {
    private readonly repository;
    constructor(repository: IPaymentRepository);
    execute(params: PaymentFindAllParams): Promise<import("../../../../../common/interfaces/pagination.interface.js").PaginatedResult<import("../../index.js").Payment>>;
}
