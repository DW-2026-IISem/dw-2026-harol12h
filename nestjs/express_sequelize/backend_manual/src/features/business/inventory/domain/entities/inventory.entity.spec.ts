import { Inventory } from './inventory.entity.js';

describe('Inventory Entity', () => {
  it('should create a valid inventory', () => {
    const inventory = Inventory.create({ branchId: 1, variantId: 1, quantity: 10 });
    expect(inventory.quantity).toBe(10);
  });

  it('should update quantity', () => {
    const inventory = Inventory.create({ branchId: 1, variantId: 1, quantity: 10 });
    inventory.updateQuantity(20);
    expect(inventory.quantity).toBe(20);
  });

  it('should throw error for negative quantity', () => {
    expect(() => Inventory.create({ branchId: 1, variantId: 1, quantity: -5 })).toThrow();
  });
});
