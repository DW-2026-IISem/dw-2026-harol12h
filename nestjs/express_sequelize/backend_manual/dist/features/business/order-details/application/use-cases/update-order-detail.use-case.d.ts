import type { IOrderDetailRepository } from '../../domain/interfaces/order-detail-repository.interface.js';
export declare class UpdateOrderDetailUseCase {
    private readonly orderDetailRepository;
    constructor(orderDetailRepository: IOrderDetailRepository);
    execute(id: number, dto: Partial<{
        quantity: number;
        unitPrice: number;
    }>): Promise<{
        id: number;
        orderId: number;
        productId: number;
        quantity: number;
        unitPrice: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
