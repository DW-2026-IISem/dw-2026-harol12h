import type { IOrderDetailRepository } from '../../domain/interfaces/order-detail-repository.interface.js';
export declare class CreateOrderDetailUseCase {
    private readonly orderDetailRepository;
    constructor(orderDetailRepository: IOrderDetailRepository);
    execute(dto: {
        orderId: number;
        productId: number;
        quantity: number;
        unitPrice: number;
    }): Promise<{
        id: number;
        orderId: number;
        productId: number;
        quantity: number;
        unitPrice: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
