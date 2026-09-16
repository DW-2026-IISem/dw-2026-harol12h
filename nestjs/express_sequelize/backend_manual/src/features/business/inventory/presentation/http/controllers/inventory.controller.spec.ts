import { InventoryController } from './inventory.controller.js';
import { CreateInventoryUseCase } from '../../../application/use-cases/create-inventory.use-case.js';

describe('InventoryController', () => {
  it('should call create use case', async () => {
    const mockUseCase = { execute: jest.fn().mockResolvedValue({ id: 1, branchId: 1, variantId: 1, quantity: 10 }) };
    const controller = new InventoryController(
      mockUseCase as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
    );
    const result = await controller.create({ branchId: 1, variantId: 1, quantity: 10 });
    expect(result.id).toBe(1);
    expect(result.quantity).toBe(10);
  });
});
