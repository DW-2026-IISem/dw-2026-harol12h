import { Promotion } from '../../../domain/entities/promotion.entity.js';
import type { IPromotionRepository, PromotionFindAllParams } from '../../../domain/interfaces/promotion-repository.interface.js';
export declare class PromotionRepository implements IPromotionRepository {
    create(promotion: Promotion): Promise<Promotion>;
    update(promotion: Promotion): Promise<Promotion>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Promotion | null>;
    findAll(params: PromotionFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<Promotion>>;
}
