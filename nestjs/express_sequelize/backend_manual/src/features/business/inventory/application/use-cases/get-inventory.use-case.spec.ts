import { GetInventoryUseCase } from './get-inventory.use-case.js';
import { Inventory } from '../../domain/entities/inventory.entity.js';
import type { IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface.js';

class MockInventoryRepository implements IInventoryRepository {
  async create(inventory: Inventory): Promise<Inventory> { return inventory; }
  async update(inventory: Inventory): Promise<Inventory> { return inventory; }
  async delete(id: number): Promise<void> {}
  async findById(id: number): Promise<Inventory | null> {
    return Inventory.create({ branchId: 1, variantId: 1, quantity: 10 });
  }
  async findAll(): Promise<any> { return { items: [], meta: {} }; }
}

describe('GetInventoryUseCase', () => {
  it('should get inventory by id', async () => {
    const repo = new MockInventoryRepository();
    const useCase = new GetInventoryUseCase(repo as any);
    const result = await useCase.execute(1);
    expect(result.quantity).toBe(10);
    expect(result.branchId).toBe(1);
    expect(result.variantId).toBe(1);
  });
});
