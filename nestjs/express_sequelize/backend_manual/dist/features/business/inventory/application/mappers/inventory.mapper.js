import { Inventory } from '../../domain/entities/inventory.entity.js';
export class InventoryMapper {
    static toDomain(model) {
        return Inventory.reconstitute({
            id: model.id,
            branchId: model.branchId,
            variantId: model.variantId,
            quantity: model.quantity,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            branchId: entity.branchId,
            variantId: entity.variantId,
            quantity: entity.quantity,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            branchId: entity.branchId,
            variantId: entity.variantId,
            quantity: entity.quantity,
        };
    }
}
//# sourceMappingURL=inventory.mapper.js.map