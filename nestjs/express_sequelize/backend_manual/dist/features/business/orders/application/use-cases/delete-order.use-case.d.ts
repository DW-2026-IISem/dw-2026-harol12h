import type { IOrderRepository } from '../../domain/interfaces/order-repository.interface.js';
export declare class DeleteOrderUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(id: number): Promise<void>;
}
