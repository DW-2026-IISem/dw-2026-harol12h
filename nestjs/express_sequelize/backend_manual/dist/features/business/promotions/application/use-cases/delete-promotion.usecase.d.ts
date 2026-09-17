import { IPromotionRepository } from '../../domain/interfaces/promotion-repository.interface.js';
export declare class DeletePromotionUseCase {
    private readonly repository;
    constructor(repository: IPromotionRepository);
    execute(id: number): Promise<void>;
}
