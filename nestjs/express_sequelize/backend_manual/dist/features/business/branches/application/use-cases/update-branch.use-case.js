var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { BranchNotFoundException } from '../../domain/exceptions/branch-not-found.exception.js';
import { BRANCH_REPOSITORY } from '../../domain/interfaces/branch-repository.interface.js';
import { BranchMapper } from '../mappers/branch.mapper.js';
let UpdateBranchUseCase = class UpdateBranchUseCase {
    branchRepository;
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    async execute(id, dto) {
        const branch = await this.branchRepository.findById(id);
        if (!branch)
            throw new BranchNotFoundException(id);
        branch.update(dto);
        const updated = await this.branchRepository.update(branch);
        return BranchMapper.toResponse(updated);
    }
};
UpdateBranchUseCase = __decorate([
    Injectable(),
    __param(0, Inject(BRANCH_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateBranchUseCase);
export { UpdateBranchUseCase };
//# sourceMappingURL=update-branch.use-case.js.map