import { OrderRepository } from './order.repository.js';
import { Order } from '../../../domain/entities/order.entity.js';

describe('OrderRepository', () => {
  let repository: OrderRepository;

  beforeEach(() => {
    repository = new OrderRepository();
  });

  it('should create an order', async () => {
    const order = Order.create({
      clientId: 1,
      orderDate: new Date(),
      status: 'PENDING',
    });
    const created = await repository.create(order);
    expect(created.clientId).toBe(1);
  });
});
