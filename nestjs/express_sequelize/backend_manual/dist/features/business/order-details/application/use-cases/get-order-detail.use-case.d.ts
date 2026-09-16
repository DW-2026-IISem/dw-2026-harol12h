import type { IOrderDetailRepository } from '../../domain/interfaces/order-detail-repository.interface.js';
export declare class GetOrderDetailUseCase {
    private readonly orderDetailRepository;
    constructor(orderDetailRepository: IOrderDetailRepository);
    execute(id: number): Promise<{
        id: number;
        orderId: number;
        productId: number;
        quantity: number;
        unitPrice: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
