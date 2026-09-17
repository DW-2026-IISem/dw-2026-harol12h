import { Promotion } from '../../domain/entities/promotion.entity.js';
import { IPromotionRepository } from '../../domain/interfaces/promotion-repository.interface.js';
export declare class CreatePromotionUseCase {
    private readonly repository;
    constructor(repository: IPromotionRepository);
    execute(props: Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'>): Promise<Promotion>;
}
