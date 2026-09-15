import { Order } from '../../domain/entities/order.entity.js';
import { OrderModel } from '../../infrastructure/persistence/models/order.model.js';
export declare class OrderMapper {
    static toEntity(model: OrderModel): Order;
    static toResponse(model: OrderModel): {
        id: any;
        clientId: number;
        orderDate: Date;
        status: string;
        createdAt: any;
        updatedAt: any;
    };
}
