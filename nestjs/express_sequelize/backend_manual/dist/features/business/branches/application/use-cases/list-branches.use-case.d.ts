import type { IBranchRepository } from '../../domain/interfaces/branch-repository.interface.js';
import { BranchFilterDto } from '../dto/branch-filter.dto.js';
export declare class ListBranchesUseCase {
    private readonly branchRepository;
    constructor(branchRepository: IBranchRepository);
    execute(filter: BranchFilterDto): Promise<{
        items: import("../dto/branch-response.dto.js").BranchResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
}
