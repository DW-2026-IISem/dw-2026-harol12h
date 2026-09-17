import { Injectable, Inject } from '@nestjs/common';
import { Promotion } from '../../domain/entities/promotion.entity.js';
import { IPromotionRepository, PROMOTION_REPOSITORY } from '../../domain/interfaces/promotion-repository.interface.js';

@Injectable()
export class CreatePromotionUseCase {
  constructor(
    @Inject(PROMOTION_REPOSITORY)
    private readonly repository: IPromotionRepository,
  ) {}

  async execute(props: Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'>): Promise<Promotion> {
    const promotion = Promotion.create(props);
    return this.repository.create(promotion);
  }
}
