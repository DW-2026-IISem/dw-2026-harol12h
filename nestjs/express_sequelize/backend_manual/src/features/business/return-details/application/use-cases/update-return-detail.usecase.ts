import { Injectable, Inject } from '@nestjs/common';
import { ReturnDetail } from '../../domain/entities/return-detail.entity.js';
import { IReturnDetailRepository, RETURN_DETAIL_REPOSITORY } from '../../domain/interfaces/return-detail-repository.interface.js';

@Injectable()
export class UpdateReturnDetailUseCase {
  constructor(
    @Inject(RETURN_DETAIL_REPOSITORY)
    private readonly repository: IReturnDetailRepository,
  ) {}

  async execute(detail: ReturnDetail): Promise<ReturnDetail> {
    return this.repository.update(detail);
  }
}
