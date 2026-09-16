import { CreateBranchDto } from '../../../application/dto/create-branch.dto.js';
import { UpdateBranchDto } from '../../../application/dto/update-branch.dto.js';
import { BranchFilterDto } from '../../../application/dto/branch-filter.dto.js';
import { BranchResponseDto } from '../../../application/dto/branch-response.dto.js';
import { CreateBranchUseCase } from '../../../application/use-cases/create-branch.use-case.js';
import { UpdateBranchUseCase } from '../../../application/use-cases/update-branch.use-case.js';
import { DeleteBranchUseCase } from '../../../application/use-cases/delete-branch.use-case.js';
import { GetBranchUseCase } from '../../../application/use-cases/get-branch.use-case.js';
import { ListBranchesUseCase } from '../../../application/use-cases/list-branches.use-case.js';
export declare class BranchesController {
    private readonly createBranchUseCase;
    private readonly updateBranchUseCase;
    private readonly deleteBranchUseCase;
    private readonly getBranchUseCase;
    private readonly listBranchesUseCase;
    constructor(createBranchUseCase: CreateBranchUseCase, updateBranchUseCase: UpdateBranchUseCase, deleteBranchUseCase: DeleteBranchUseCase, getBranchUseCase: GetBranchUseCase, listBranchesUseCase: ListBranchesUseCase);
    create(dto: CreateBranchDto): Promise<BranchResponseDto>;
    findAll(filter: BranchFilterDto): Promise<{
        items: BranchResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
    findOne(id: number): Promise<BranchResponseDto>;
    update(id: number, dto: UpdateBranchDto): Promise<BranchResponseDto>;
    remove(id: number): Promise<void>;
}
