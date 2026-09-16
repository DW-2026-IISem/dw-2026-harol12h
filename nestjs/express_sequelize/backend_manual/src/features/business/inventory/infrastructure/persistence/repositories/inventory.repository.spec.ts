import { InventoryRepository } from './inventory.repository.js';
import { Inventory } from '../../../domain/entities/inventory.entity.js';

describe('InventoryRepository', () => {
  let repository: InventoryRepository;

  beforeEach(() => {
    repository = new InventoryRepository();
  });

  it('should create inventory', async () => {
    const inventory = Inventory.create({ branchId: 1, variantId: 1, quantity: 10 });
    const created = await repository.create(inventory);
    expect(created.quantity).toBe(10);
  });
});
