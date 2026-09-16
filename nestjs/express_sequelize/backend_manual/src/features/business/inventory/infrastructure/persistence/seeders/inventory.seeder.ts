import { InventoryModel } from '../models/inventory.model.js';

export async function seedInventory(): Promise<void> {
  await InventoryModel.bulkCreate([
    { branchId: 1, variantId: 1, quantity: 100 },
    { branchId: 1, variantId: 2, quantity: 50 },
  ]);
}
