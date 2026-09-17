import { Promotion } from '../../domain/entities/promotion.entity.js';
import { IPromotionRepository } from '../../domain/interfaces/promotion-repository.interface.js';
export declare class PromotionService {
    private readonly repository;
    constructor(repository: IPromotionRepository);
    activatePromotion(promotion: Promotion): Promise<Promotion>;
    deactivatePromotion(promotion: Promotion): Promise<Promotion>;
}
