import { Inventory } from '../../domain/entities/inventory.entity.js';
import { InventoryResponseDto } from '../dto/inventory-response.dto.js';
import { InventoryModel } from '../../infrastructure/persistence/models/inventory.model.js';
export declare class InventoryMapper {
    static toDomain(model: InventoryModel): Inventory;
    static toResponse(entity: Inventory): InventoryResponseDto;
    static toPersistence(entity: Inventory): Partial<InventoryModel>;
}
