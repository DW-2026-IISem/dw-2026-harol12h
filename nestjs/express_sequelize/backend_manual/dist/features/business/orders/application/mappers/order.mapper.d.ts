import { Order } from '../../domain/entities/order.entity.js';
import { OrderResponseDto } from '../dto/order-response.dto.js';
import { OrderModel } from '../../infrastructure/persistence/models/order.model.js';
export declare class OrderMapper {
    static toDomain(model: OrderModel): Order;
    static toResponse(entity: Order): OrderResponseDto;
    static toPersistence(entity: Order): Partial<OrderModel>;
}
