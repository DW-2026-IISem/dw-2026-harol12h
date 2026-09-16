import { Inject, Injectable } from '@nestjs/common';
import { BranchNotFoundException } from '../../domain/exceptions/branch-not-found.exception.js';
import type { IBranchRepository } from '../../domain/interfaces/branch-repository.interface.js';
import { BRANCH_REPOSITORY } from '../../domain/interfaces/branch-repository.interface.js';

@Injectable()
export class DeleteBranchUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepository: IBranchRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const branch = await this.branchRepository.findById(id);
    if (!branch) throw new BranchNotFoundException(id);
    await this.branchRepository.delete(id);
  }
}
