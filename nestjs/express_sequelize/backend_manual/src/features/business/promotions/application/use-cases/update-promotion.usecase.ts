import { Injectable, Inject } from '@nestjs/common';
import { Promotion } from '../../domain/entities/promotion.entity.js';
import { IPromotionRepository, PROMOTION_REPOSITORY } from '../../domain/interfaces/promotion-repository.interface.js';

@Injectable()
export class UpdatePromotionUseCase {
  constructor(
    @Inject(PROMOTION_REPOSITORY)
    private readonly repository: IPromotionRepository,
  ) {}

  async execute(promotion: Promotion): Promise<Promotion> {
    return this.repository.update(promotion);
  }
}
