import { OrderDetail } from '../../domain/entities/order-detail.entity.js';
import { OrderDetailModel } from '../../infrastructure/persistence/models/order-detail.model.js';
export declare class OrderDetailMapper {
    static toDomain(model: OrderDetailModel): OrderDetail;
    static toResponse(entity: OrderDetail): {
        id: number;
        orderId: number;
        productId: number;
        quantity: number;
        unitPrice: number;
        createdAt: Date;
        updatedAt: Date;
    };
    static toPersistence(entity: OrderDetail): Partial<OrderDetailModel>;
}
