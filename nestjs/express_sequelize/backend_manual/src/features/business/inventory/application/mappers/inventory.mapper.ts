import { Inventory } from '../../domain/entities/inventory.entity.js';
import { InventoryResponseDto } from '../dto/inventory-response.dto.js';
import { InventoryModel } from '../../infrastructure/persistence/models/inventory.model.js';

export class InventoryMapper {
  static toDomain(model: InventoryModel): Inventory {
    return Inventory.reconstitute({
      id: model.id,
      branchId: model.branchId,
      variantId: model.variantId,
      quantity: model.quantity,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Inventory): InventoryResponseDto {
    return {
      id: entity.id!,
      branchId: entity.branchId,
      variantId: entity.variantId,
      quantity: entity.quantity,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Inventory): Partial<InventoryModel> {
    return {
      id: entity.id,
      branchId: entity.branchId,
      variantId: entity.variantId,
      quantity: entity.quantity,
    };
  }
}
