import type { IOrderRepository } from '../../domain/interfaces/order-repository.interface.js';
export declare class ListOrdersUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(): Promise<{
        id: any;
        clientId: number;
        orderDate: Date;
        status: string;
        createdAt: any;
        updatedAt: any;
    }[]>;
}
