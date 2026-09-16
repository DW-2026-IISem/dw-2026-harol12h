import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { OrderDetail } from '../entities/order-detail.entity.js';
export declare const ORDER_DETAIL_REPOSITORY = "ORDER_DETAIL_REPOSITORY";
export interface OrderDetailFindAllParams {
    page?: number;
    limit?: number;
    orderId?: number;
}
export interface IOrderDetailRepository {
    create(detail: OrderDetail): Promise<OrderDetail>;
    update(detail: OrderDetail): Promise<OrderDetail>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<OrderDetail | null>;
    findAll(params: OrderDetailFindAllParams): Promise<PaginatedResult<OrderDetail>>;
}
