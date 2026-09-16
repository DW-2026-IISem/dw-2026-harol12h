import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { Inventory } from '../entities/inventory.entity.js';

export const INVENTORY_REPOSITORY = 'INVENTORY_REPOSITORY';

export interface InventoryFindAllParams {
  page?: number;
  limit?: number;
  branchId?: number;
  variantId?: number;
}

export interface IInventoryRepository {
  create(inventory: Inventory): Promise<Inventory>;
  update(inventory: Inventory): Promise<Inventory>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Inventory | null>;
  findAll(params: InventoryFindAllParams): Promise<PaginatedResult<Inventory>>;
}
