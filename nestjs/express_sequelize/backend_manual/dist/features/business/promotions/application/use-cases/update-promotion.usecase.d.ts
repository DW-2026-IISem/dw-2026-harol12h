import { Promotion } from '../../domain/entities/promotion.entity.js';
import { IPromotionRepository } from '../../domain/interfaces/promotion-repository.interface.js';
export declare class UpdatePromotionUseCase {
    private readonly repository;
    constructor(repository: IPromotionRepository);
    execute(promotion: Promotion): Promise<Promotion>;
}
