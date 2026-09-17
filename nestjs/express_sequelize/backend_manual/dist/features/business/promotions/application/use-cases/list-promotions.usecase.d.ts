import { IPromotionRepository, PromotionFindAllParams } from '../../domain/interfaces/promotion-repository.interface.js';
export declare class ListPromotionsUseCase {
    private readonly repository;
    constructor(repository: IPromotionRepository);
    execute(params: PromotionFindAllParams): Promise<import("../../../../../common/interfaces/pagination.interface.js").PaginatedResult<import("../../index.js").Promotion>>;
}
