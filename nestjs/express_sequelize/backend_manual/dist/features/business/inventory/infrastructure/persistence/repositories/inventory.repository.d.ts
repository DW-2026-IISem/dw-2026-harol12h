import { Inventory } from '../../../domain/entities/inventory.entity.js';
import type { IInventoryRepository, InventoryFindAllParams } from '../../../domain/interfaces/inventory-repository.interface.js';
export declare class InventoryRepository implements IInventoryRepository {
    create(inventory: Inventory): Promise<Inventory>;
    update(inventory: Inventory): Promise<Inventory>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Inventory | null>;
    findAll(params: InventoryFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<Inventory>>;
}
