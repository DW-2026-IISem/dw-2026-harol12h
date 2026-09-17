import { Injectable, Inject } from '@nestjs/common';
import { IReturnDetailRepository, RETURN_DETAIL_REPOSITORY } from '../../domain/interfaces/return-detail-repository.interface.js';

@Injectable()
export class DeleteReturnDetailUseCase {
  constructor(
    @Inject(RETURN_DETAIL_REPOSITORY)
    private readonly repository: IReturnDetailRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
