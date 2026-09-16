import type { IBranchRepository } from '../../domain/interfaces/branch-repository.interface.js';
import { CreateBranchDto } from '../dto/create-branch.dto.js';
export declare class CreateBranchUseCase {
    private readonly branchRepository;
    constructor(branchRepository: IBranchRepository);
    execute(dto: CreateBranchDto): Promise<import("../dto/branch-response.dto.js").BranchResponseDto>;
}
