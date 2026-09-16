var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { BRANCH_REPOSITORY } from './domain/interfaces/branch-repository.interface.js';
import { BranchRepository } from './infrastructure/persistence/repositories/branch.repository.js';
import { CreateBranchUseCase } from './application/use-cases/create-branch.use-case.js';
import { UpdateBranchUseCase } from './application/use-cases/update-branch.use-case.js';
import { DeleteBranchUseCase } from './application/use-cases/delete-branch.use-case.js';
import { GetBranchUseCase } from './application/use-cases/get-branch.use-case.js';
import { ListBranchesUseCase } from './application/use-cases/list-branches.use-case.js';
import { BranchesController } from './presentation/http/controllers/branches.controller.js';
let BranchesModule = class BranchesModule {
};
BranchesModule = __decorate([
    Module({
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
], BranchesModule);
export { BranchesModule };
//# sourceMappingURL=branches.module.js.map