import { OrderModel } from '../models/order.model.js';
import { Order } from '../../../domain/entities/order.entity.js';
export declare class OrderRepository {
    create(order: Order): Promise<OrderModel>;
    findById(id: number): Promise<OrderModel | null>;
    findAll(): Promise<OrderModel[]>;
    update(order: Order): Promise<OrderModel>;
    delete(id: number): Promise<void>;
}
