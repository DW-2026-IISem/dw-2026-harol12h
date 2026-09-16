import { Branch } from '../../../domain/entities/branch.entity.js';
import type { IBranchRepository, BranchFindAllParams } from '../../../domain/interfaces/branch-repository.interface.js';
export declare class BranchRepository implements IBranchRepository {
    create(branch: Branch): Promise<Branch>;
    update(branch: Branch): Promise<Branch>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Branch | null>;
    findAll(params: BranchFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<Branch>>;
}
