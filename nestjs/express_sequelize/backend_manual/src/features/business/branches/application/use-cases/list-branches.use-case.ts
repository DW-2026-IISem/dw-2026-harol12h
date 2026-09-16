import { Inject, Injectable } from '@nestjs/common';
import type { IBranchRepository } from '../../domain/interfaces/branch-repository.interface.js';
import { BRANCH_REPOSITORY } from '../../domain/interfaces/branch-repository.interface.js';
import { BranchFilterDto } from '../dto/branch-filter.dto.js';
import { BranchMapper } from '../mappers/branch.mapper.js';
import { Branch } from '../../domain/entities/branch.entity.js';

@Injectable()
export class ListBranchesUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepository: IBranchRepository,
  ) {}

  async execute(filter: BranchFilterDto) {
    const result = await this.branchRepository.findAll(filter);
    return {
      items: result.items.map((b: Branch) => BranchMapper.toResponse(b)),
      meta: result.meta,
    };
  }
}
