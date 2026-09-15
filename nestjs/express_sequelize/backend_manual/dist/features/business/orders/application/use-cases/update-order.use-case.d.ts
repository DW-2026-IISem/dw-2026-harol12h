import type { IOrderRepository } from '../../domain/interfaces/order-repository.interface.js';
import { UpdateOrderDto } from '../dto/update-order.dto.js';
export declare class UpdateOrderUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(id: number, dto: UpdateOrderDto): Promise<import("../dto/order-response.dto.js").OrderResponseDto>;
}
