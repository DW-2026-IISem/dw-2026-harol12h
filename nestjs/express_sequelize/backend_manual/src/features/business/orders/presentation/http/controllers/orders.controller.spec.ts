import { OrdersController } from './orders.controller';
import { CreateOrderUseCase } from '../../../application/use-cases/create-order.use-case';

describe('OrdersController', () => {
  it('should call create use case', async () => {
    const mockUseCase = { execute: jest.fn().mockResolvedValue({ id: 1 }) };
    const controller = new OrdersController(
      mockUseCase as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
    );
    const result = await controller.create({
      clientId: 1,
      orderDate: new Date(),
      status: 'PENDING',
    });
    expect(result.id).toBe(1);
  });
});
