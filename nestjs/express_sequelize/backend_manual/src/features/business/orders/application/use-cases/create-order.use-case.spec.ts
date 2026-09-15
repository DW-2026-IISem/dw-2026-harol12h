import { CreateOrderUseCase } from './create-order.use-case';
import { IOrderRepository } from '../../domain/interfaces/order-repository.interface';
import { Order } from '../../domain/entities/order.entity';

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
