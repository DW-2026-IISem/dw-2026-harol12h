import { Module } from '@nestjs/common';
import { PromotionsController } from './presentation/http/controllers/promotions.controller.js';
import { PromotionRepository } from './infrastructure/persistence/repositories/promotion.repository.js';
import { CreatePromotionUseCase } from './application/use-cases/create-promotion.usecase.js';
import { UpdatePromotionUseCase } from './application/use-cases/update-promotion.usecase.js';
import { DeletePromotionUseCase } from './application/use-cases/delete-promotion.usecase.js';
import { FindPromotionUseCase } from './application/use-cases/find-promotion.usecase.js';
import { ListPromotionsUseCase } from './application/use-cases/list-promotions.usecase.js';
import { PROMOTION_REPOSITORY } from './domain/interfaces/promotion-repository.interface.js';

@Module({
  controllers: [PromotionsController],
  providers: [
    { provide: PROMOTION_REPOSITORY, useClass: PromotionRepository },
    CreatePromotionUseCase,
    UpdatePromotionUseCase,
    DeletePromotionUseCase,
    FindPromotionUseCase,
    ListPromotionsUseCase,
  ],
})
export class PromotionsModule {}
