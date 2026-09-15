import type { IOrderRepository } from '../../domain/interfaces/order-repository.interface.js';
import { CreateOrderDto } from '../dto/create-order.dto.js';
export declare class CreateOrderUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(dto: CreateOrderDto): Promise<import("../dto/order-response.dto.js").OrderResponseDto>;
}
