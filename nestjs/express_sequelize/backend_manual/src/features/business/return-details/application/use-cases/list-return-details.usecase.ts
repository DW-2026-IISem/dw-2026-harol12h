import { Injectable, Inject } from '@nestjs/common';
import { IReturnDetailRepository, RETURN_DETAIL_REPOSITORY, ReturnDetailFindAllParams } from '../../domain/interfaces/return-detail-repository.interface.js';

@Injectable()
export class ListReturnDetailsUseCase {
  constructor(
    @Inject(RETURN_DETAIL_REPOSITORY)
    private readonly repository: IReturnDetailRepository,
  ) {}

  async execute(params: ReturnDetailFindAllParams) {
    return this.repository.findAll(params);
  }
}
