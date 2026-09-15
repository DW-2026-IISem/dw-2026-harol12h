import type { IOrderRepository } from '../../domain/interfaces/order-repository.interface.js';
export declare class GetOrderUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(id: number): Promise<import("../dto/order-response.dto.js").OrderResponseDto>;
}
