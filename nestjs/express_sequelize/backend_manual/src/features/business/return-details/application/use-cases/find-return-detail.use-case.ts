import { Injectable, Inject } from '@nestjs/common';
import { ReturnDetail } from '../../domain/entities/return-detail.entity.js';
import {
  IReturnDetailRepository,
  RETURN_DETAIL_REPOSITORY,
} from '../../domain/interfaces/return-detail-repository.interface.js';

@Injectable()
export class FindReturnDetailUseCase {
  constructor(
    @Inject(RETURN_DETAIL_REPOSITORY)
    private readonly repository: IReturnDetailRepository,
  ) {}

  async execute(id: number): Promise<ReturnDetail | null> {
    return this.repository.findById(id);
  }
}
