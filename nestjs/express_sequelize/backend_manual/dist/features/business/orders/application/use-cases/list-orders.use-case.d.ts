import type { IOrderRepository } from '../../domain/interfaces/order-repository.interface.js';
import { OrderFilterDto } from '../dto/order-filter.dto.js';
export declare class ListOrdersUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(filter: OrderFilterDto): Promise<{
        items: import("../dto/order-response.dto.js").OrderResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
}
