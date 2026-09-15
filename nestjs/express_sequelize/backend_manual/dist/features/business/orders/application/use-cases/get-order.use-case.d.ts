import type { IOrderRepository } from '../../domain/interfaces/order-repository.interface.js';
export declare class GetOrderUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(id: number): Promise<{
        id: any;
        clientId: number;
        orderDate: Date;
        status: string;
        createdAt: any;
        updatedAt: any;
    }>;
}
