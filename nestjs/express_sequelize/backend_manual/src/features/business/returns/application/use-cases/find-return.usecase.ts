import { Injectable, Inject } from '@nestjs/common';
import { Return } from '../../domain/entities/return.entity.js';
import { IReturnRepository, RETURN_REPOSITORY } from '../../domain/interfaces/return-repository.interface.js';

@Injectable()
export class FindReturnUseCase {
  constructor(
    @Inject(RETURN_REPOSITORY)
    private readonly repository: IReturnRepository,
  ) {}

  async execute(id: number): Promise<Return | null> {
    return this.repository.findById(id);
  }
}
