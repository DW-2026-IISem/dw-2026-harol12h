import { Injectable, Inject } from '@nestjs/common';
import { IReturnRepository, RETURN_REPOSITORY } from '../../domain/interfaces/return-repository.interface.js';

@Injectable()
export class DeleteReturnUseCase {
  constructor(
    @Inject(RETURN_REPOSITORY)
    private readonly repository: IReturnRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
