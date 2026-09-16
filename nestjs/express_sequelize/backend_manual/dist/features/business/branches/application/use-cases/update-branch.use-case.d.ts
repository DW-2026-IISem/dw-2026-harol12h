import type { IBranchRepository } from '../../domain/interfaces/branch-repository.interface.js';
import { UpdateBranchDto } from '../dto/update-branch.dto.js';
export declare class UpdateBranchUseCase {
    private readonly branchRepository;
    constructor(branchRepository: IBranchRepository);
    execute(id: number, dto: UpdateBranchDto): Promise<import("../dto/branch-response.dto.js").BranchResponseDto>;
}
