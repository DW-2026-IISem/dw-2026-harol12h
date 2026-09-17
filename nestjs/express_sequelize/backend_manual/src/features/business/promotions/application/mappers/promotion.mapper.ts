import { Promotion } from '../../domain/entities/promotion.entity.js';
import { PromotionModel } from '../../infrastructure/persistence/models/promotion.model.js';

export class PromotionMapper {
  static toDomain(model: PromotionModel): Promotion {
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

  static toPersistence(entity: Promotion): any {
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
