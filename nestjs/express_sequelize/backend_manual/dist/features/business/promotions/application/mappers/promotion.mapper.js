import { Promotion } from '../../domain/entities/promotion.entity.js';
export class PromotionMapper {
    static toDomain(model) {
        return Promotion.reconstitute({
            id: model.id,
            name: model.name,
            description: model.description,
            discountPercentage: model.discountPercentage,
            startDate: model.startDate,
            endDate: model.endDate,
            active: model.active,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            discountPercentage: entity.discountPercentage,
            startDate: entity.startDate,
            endDate: entity.endDate,
            active: entity.active,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}
//# sourceMappingURL=promotion.mapper.js.map