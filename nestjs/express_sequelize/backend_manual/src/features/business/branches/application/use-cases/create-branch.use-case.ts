import { Inject, Injectable } from '@nestjs/common';
import { Branch } from '../../domain/entities/branch.entity.js';
import type { IBranchRepository } from '../../domain/interfaces/branch-repository.interface.js';
import { BRANCH_REPOSITORY } from '../../domain/interfaces/branch-repository.interface.js';
import { CreateBranchDto } from '../dto/create-branch.dto.js';
import { BranchMapper } from '../mappers/branch.mapper.js';

@Injectable()
export class CreateBranchUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepository: IBranchRepository,
  ) {}

  async execute(dto: CreateBranchDto) {
    const branch = Branch.create(dto);
    const created = await this.branchRepository.create(branch);
    return BranchMapper.toResponse(created);
  }
}
