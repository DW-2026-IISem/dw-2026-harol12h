import { Order } from '../../../domain/entities/order.entity.js';
import { IOrderRepository, OrderFindAllParams } from '../../../domain/interfaces/order-repository.interface.js';
export declare class OrderRepository implements IOrderRepository {
    create(order: Order): Promise<Order>;
    update(order: Order): Promise<Order>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Order | null>;
    findAll(params: OrderFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<Order>>;
}
