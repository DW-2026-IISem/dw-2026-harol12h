import type { IOrderDetailRepository } from '../../domain/interfaces/order-detail-repository.interface.js';
export declare class DeleteOrderDetailUseCase {
    private readonly orderDetailRepository;
    constructor(orderDetailRepository: IOrderDetailRepository);
    execute(id: number): Promise<void>;
}
