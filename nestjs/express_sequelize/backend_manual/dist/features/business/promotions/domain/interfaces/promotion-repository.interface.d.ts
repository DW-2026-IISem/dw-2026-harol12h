import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { Promotion } from '../entities/promotion.entity.js';
export declare const PROMOTION_REPOSITORY = "PROMOTION_REPOSITORY";
export interface PromotionFindAllParams {
    page?: number;
    limit?: number;
    active?: boolean;
}
export interface IPromotionRepository {
    create(promotion: Promotion): Promise<Promotion>;
    update(promotion: Promotion): Promise<Promotion>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Promotion | null>;
    findAll(params: PromotionFindAllParams): Promise<PaginatedResult<Promotion>>;
}
