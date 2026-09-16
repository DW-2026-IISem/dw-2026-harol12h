import type { IOrderDetailRepository } from '../../domain/interfaces/order-detail-repository.interface.js';
export declare class ListOrderDetailsUseCase {
    private readonly orderDetailRepository;
    constructor(orderDetailRepository: IOrderDetailRepository);
    execute(filter: {
        orderId?: number;
        page?: number;
        limit?: number;
    }): Promise<{
        items: {
            id: number;
            orderId: number;
            productId: number;
            quantity: number;
            unitPrice: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: import("../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
}
