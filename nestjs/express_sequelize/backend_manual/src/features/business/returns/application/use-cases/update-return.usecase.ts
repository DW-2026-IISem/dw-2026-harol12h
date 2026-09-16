import { Injectable, Inject } from '@nestjs/common';
import { Return } from '../../domain/entities/return.entity.js';
import { IReturnRepository, RETURN_REPOSITORY } from '../../domain/interfaces/return-repository.interface.js';

@Injectable()
export class UpdateReturnUseCase {
  constructor(
    @Inject(RETURN_REPOSITORY)
    private readonly repository: IReturnRepository,
  ) {}

  async execute(returnEntity: Return): Promise<Return> {
    return this.repository.update(returnEntity);
  }
}
