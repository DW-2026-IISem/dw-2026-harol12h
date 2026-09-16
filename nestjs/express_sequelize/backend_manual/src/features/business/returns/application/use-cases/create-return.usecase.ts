import { Injectable, Inject } from '@nestjs/common';
import { Return } from '../../domain/entities/return.entity.js';
import { IReturnRepository, RETURN_REPOSITORY } from '../../domain/interfaces/return-repository.interface.js';

@Injectable()
export class CreateReturnUseCase {
  constructor(
    @Inject(RETURN_REPOSITORY)
    private readonly repository: IReturnRepository,
  ) {}

  async execute(props: Omit<Return, 'id' | 'createdAt' | 'updatedAt'>): Promise<Return> {
    const returnEntity = Return.create(props);
    return this.repository.create(returnEntity);
  }
}
