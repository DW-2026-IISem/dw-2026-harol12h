import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { Branch } from '../entities/branch.entity.js';
export declare const BRANCH_REPOSITORY = "BRANCH_REPOSITORY";
export interface BranchFindAllParams {
    page?: number;
    limit?: number;
    search?: string;
}
export interface IBranchRepository {
    create(branch: Branch): Promise<Branch>;
    update(branch: Branch): Promise<Branch>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Branch | null>;
    findAll(params: BranchFindAllParams): Promise<PaginatedResult<Branch>>;
}
