var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { PromotionsController } from './presentation/http/controllers/promotions.controller.js';
import { PromotionRepository } from './infrastructure/persistence/repositories/promotion.repository.js';
import { CreatePromotionUseCase } from './application/use-cases/create-promotion.usecase.js';
import { UpdatePromotionUseCase } from './application/use-cases/update-promotion.usecase.js';
import { DeletePromotionUseCase } from './application/use-cases/delete-promotion.usecase.js';
import { FindPromotionUseCase } from './application/use-cases/find-promotion.usecase.js';
import { ListPromotionsUseCase } from './application/use-cases/list-promotions.usecase.js';
import { PROMOTION_REPOSITORY } from './domain/interfaces/promotion-repository.interface.js';
let PromotionsModule = class PromotionsModule {
};
PromotionsModule = __decorate([
    Module({
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
], PromotionsModule);
export { PromotionsModule };
//# sourceMappingURL=promotions.module.js.map