import { Injectable, Inject } from '@nestjs/common';
import { IReturnRepository, RETURN_REPOSITORY, ReturnFindAllParams } from '../../domain/interfaces/return-repository.interface.js';

@Injectable()
export class ListReturnsUseCase {
  constructor(
    @Inject(RETURN_REPOSITORY)
    private readonly repository: IReturnRepository,
  ) {}

  async execute(params: ReturnFindAllParams) {
    return this.repository.findAll(params);
  }
}
