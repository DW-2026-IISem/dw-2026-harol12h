import { Promotion } from '../../domain/entities/promotion.entity.js';
import { PromotionModel } from '../../infrastructure/persistence/models/promotion.model.js';
export declare class PromotionMapper {
    static toDomain(model: PromotionModel): Promotion;
    static toPersistence(entity: Promotion): any;
}
