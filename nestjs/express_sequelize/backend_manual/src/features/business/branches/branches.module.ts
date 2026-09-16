import { Module } from '@nestjs/common';
import { BRA`NCH_REPOSITORY } from './domain/interfaces/branch-repository.interface.js';
import { BranchRepository } from './infrastructure/persistence/repositories/branch.repository.js';
import { CreateBranchUseCase } from './application/use-cases/create-branch.use-case.js';
import { UpdateBranchUseCase } from './application/use-cases/update-branch.use-case.js';
import { DeleteBranchUseCase } from './application/use-cases/delete-branch.use-case.js';
import { GetBranchUseCase } from './application/use-cases/get-branch.use-case.js';
import { ListBranchesUseCase } from './application/use-cases/list-branches.use-case.js';
import { BranchesController } from './presentation/http/controllers/branches.controller.js';

@Module({
  controllers: [BranchesController],
  providers: [
    BranchRepository,
    { provide: BRANCH_REPOSITORY, useExisting: BranchRepository },
    CreateBranchUseCase,
    UpdateBranchUseCase,
    DeleteBranchUseCase,
    GetBranchUseCase,
    ListBranchesUseCase,
  ],
  exports: [BRANCH_REPOSITORY],
})
export class BranchesModule {}
