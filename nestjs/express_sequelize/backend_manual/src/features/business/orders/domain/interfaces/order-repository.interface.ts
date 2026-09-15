import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { Order } from '../entities/order.entity.js';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface OrderFindAllParams {
  page?: number;
  limit?: number;
  clientId?: number;
  status?: string;
}

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Order | null>;
  findAll(params: OrderFindAllParams): Promise<PaginatedResult<Order>>;
}
