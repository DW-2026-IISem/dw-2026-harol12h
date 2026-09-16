import { CreateInventoryUseCase } from './create-inventory.use-case.js';
import { Inventory } from '../../domain/entities/inventory.entity.js';
import type { IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface.js';

class MockInventoryRepository implements IInventoryRepository {
  async create(inventory: Inventory): Promise<Inventory> { return inventory; }
  async update(inventory: Inventory): Promise<Inventory> { return inventory; }
  async delete(id: number): Promise<void> {}
  async findById(id: number): Promise<Inventory | null> { return null; }
  async findAll(): Promise<any> { return { items: [], meta: {} }; }
}

describe('CreateInventoryUseCase', () => {
  it('should create inventory', async () => {
    const repo = new MockInventoryRepository();
    const useCase = new CreateInventoryUseCase(repo as any);
    const result = await useCase.execute({ branchId: 1, variantId: 1, quantity: 10 });
    expect(result.quantity).toBe(10);
  });
});
