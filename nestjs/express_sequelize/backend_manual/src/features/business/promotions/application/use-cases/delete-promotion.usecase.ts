import { Injectable, Inject } from '@nestjs/common';
import { IPromotionRepository, PROMOTION_REPOSITORY } from '../../domain/interfaces/promotion-repository.interface.js';

@Injectable()
export class DeletePromotionUseCase {
  constructor(
    @Inject(PROMOTION_REPOSITORY)
    private readonly repository: IPromotionRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
