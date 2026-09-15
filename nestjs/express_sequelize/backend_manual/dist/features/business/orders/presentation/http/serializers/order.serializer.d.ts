import { Order } from '../../../domain/entities/order.entity.js';
import { OrderResponseDto } from '../../../application/dto/order-response.dto.js';
export declare class OrderSerializer {
    static serialize(entity: Order): OrderResponseDto;
}
