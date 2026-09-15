import { Order } from '../entities/order.entity.js';
import { OrderModel } from '../../infrastructure/persistence/models/order.model.js';
export declare const ORDER_REPOSITORY = "ORDER_REPOSITORY";
export interface IOrderRepository {
    create(order: Order): Promise<OrderModel>;
    findById(id: number): Promise<OrderModel | null>;
    findAll(): Promise<OrderModel[]>;
    update(order: Partial<Order>): Promise<OrderModel>;
    delete(id: number): Promise<void>;
}
