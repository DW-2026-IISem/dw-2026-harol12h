import { Injectable, Inject } from '@nestjs/common';
import { ReturnDetail } from '../../domain/entities/return-detail.entity.js';
import { IReturnDetailRepository, RETURN_DETAIL_REPOSITORY } from '../../domain/interfaces/return-detail-repository.interface.js';

@Injectable()
export class CreateReturnDetailUseCase {
  constructor(
    @Inject(RETURN_DETAIL_REPOSITORY)
    private readonly repository: IReturnDetailRepository,
  ) {}

  async execute(props: Omit<ReturnDetail, 'id' | 'createdAt' | 'updatedAt'>): Promise<ReturnDetail> {
    const detail = ReturnDetail.create(props);
    return this.repository.create(detail);
  }
}
