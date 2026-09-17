import { Injectable, Inject } from '@nestjs/common';
import { IPromotionRepository, PROMOTION_REPOSITORY, PromotionFindAllParams } from '../../domain/interfaces/promotion-repository.interface.js';

@Injectable()
export class ListPromotionsUseCase {
  constructor(
    @Inject(PROMOTION_REPOSITORY)
    private readonly repository: IPromotionRepository,
  ) {}

  async execute(params: PromotionFindAllParams) {
    return this.repository.findAll(params);
  }
}
