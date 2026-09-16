import { Variant } from '../../domain/entities/variant.entity.js';
export class VariantMapper {
    static toDomain(model) {
        return Variant.reconstitute({
            id: model.id,
            productId: model.productId,
            name: model.name,
            description: model.description ?? undefined,
            isActive: model.isActive,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            productId: entity.productId,
            name: entity.name,
            description: entity.description,
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            productId: entity.productId,
            name: entity.name,
            description: entity.description ?? null,
            isActive: entity.isActive,
        };
    }
}
//# sourceMappingURL=variant.mapper.js.map