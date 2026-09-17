import { Promotion } from '../../domain/entities/promotion.entity.js';
import { IPromotionRepository } from '../../domain/interfaces/promotion-repository.interface.js';
export declare class FindPromotionUseCase {
    private readonly repository;
    constructor(repository: IPromotionRepository);
    execute(id: number): Promise<Promotion | null>;
}
