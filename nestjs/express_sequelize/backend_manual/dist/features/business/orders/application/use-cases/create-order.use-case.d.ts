import type { IOrderRepository } from '../../domain/interfaces/order-repository.interface.js';
import { CreateOrderDto } from '../dto/create-order.dto.js';
export declare class CreateOrderUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(dto: CreateOrderDto): Promise<{
        id: any;
        clientId: number;
        orderDate: Date;
        status: string;
        createdAt: any;
        updatedAt: any;
    }>;
}
