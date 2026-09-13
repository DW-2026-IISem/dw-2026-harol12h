import { Collection } from '../../domain/entities/collection.entity.js';
export class CollectionMapper {
    static toDomain(model) {
        return Collection.reconstitute({
            id: model.id,
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
            name: entity.name,
            description: entity.description ?? null,
            isActive: entity.isActive,
        };
    }
}
//# sourceMappingURL=collection.mapper.js.map