import { Order } from './order.entity.js';

describe('Order Entity', () => {
  it('should create a valid order', () => {
    const order = Order.create({
      clientId: 1,
      orderDate: new Date(),
      status: 'PENDING',
    });
    expect(order.clientId).toBe(1);
    expect(order.status).toBe('PENDING');
  });

  it('should update status', () => {
    const order = Order.create({
      clientId: 1,
      orderDate: new Date(),
      status: 'PENDING',
    });
    order.updateStatus('COMPLETED');
    expect(order.status).toBe('COMPLETED');
  });
});
