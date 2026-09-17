import { CreatePromotionUseCase } from '../../../application/use-cases/create-promotion.usecase.js';
import { UpdatePromotionUseCase } from '../../../application/use-cases/update-promotion.usecase.js';
import { DeletePromotionUseCase } from '../../../application/use-cases/delete-promotion.usecase.js';
import { FindPromotionUseCase } from '../../../application/use-cases/find-promotion.usecase.js';
import { ListPromotionsUseCase } from '../../../application/use-cases/list-promotions.usecase.js';
import { CreatePromotionDto } from '../../../application/dto/create-promotion.dto.js';
import { UpdatePromotionDto } from '../../../application/dto/update-promotion.dto.js';
export declare class PromotionsController {
    private readonly createPromotion;
    private readonly updatePromotion;
    private readonly deletePromotion;
    private readonly findPromotion;
    private readonly listPromotions;
    constructor(createPromotion: CreatePromotionUseCase, updatePromotion: UpdatePromotionUseCase, deletePromotion: DeletePromotionUseCase, findPromotion: FindPromotionUseCase, listPromotions: ListPromotionsUseCase);
    create(dto: CreatePromotionDto): Promise<import("../../../index.js").Promotion>;
    list(): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<import("../../../index.js").Promotion>>;
    find(id: number): Promise<import("../../../index.js").Promotion | null>;
    update(id: number, dto: UpdatePromotionDto): Promise<import("../../../index.js").Promotion>;
    delete(id: number): Promise<void>;
}
