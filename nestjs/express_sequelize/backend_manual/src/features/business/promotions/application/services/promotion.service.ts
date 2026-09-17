import { Injectable, Inject } from '@nestjs/common';
import { Promotion } from '../../domain/entities/promotion.entity.js';
import { IPromotionRepository, PROMOTION_REPOSITORY } from '../../domain/interfaces/promotion-repository.interface.js';

@Injectable()
export class PromotionService {
  constructor(
    @Inject(PROMOTION_REPOSITORY)
    private readonly repository: IPromotionRepository,
  ) {}

  async activatePromotion(promotion: Promotion): Promise<Promotion> {
    promotion.active = true;
    return this.repository.update(promotion);
  }

  async deactivatePromotion(promotion: Promotion): Promise<Promotion> {
    promotion.active = false;
    return this.repository.update(promotion);
  }
}
