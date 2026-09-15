import { CreateOrderUseCase } from './create-order.use-case.js';
import type { IOrderRepository } 
  from '../../domain/interfaces/order-repository.interface.js';
import { ORDER_REPOSITORY } 
  from '../../domain/interfaces/order-repository.interface.js';
import { Order } from '../../domain/entities/order.entity.js';

class MockOrderRepository implements IOrderRepository {
  async create(order: Order): Promise<Order> { return order; }
  async update(order: Order): Promise<Order> { return order; }
  async delete(id: number): Promise<void> {}
  async findById(id: number): Promise<Order | null> { return null; }
  async findAll(): Promise<any> { return { items: [], meta: {} }; }
}

describe('CreateOrderUseCase', () => {
  it('should create an order', async () => {
    const repo = new MockOrderRepository();
    const useCase = new CreateOrderUseCase(repo as any);
    const result = await useCase.execute({
      clientId: 1,
      orderDate: new Date(),
      status: 'PENDING',
    });
    expect(result.clientId).toBe(1);
  });
});
