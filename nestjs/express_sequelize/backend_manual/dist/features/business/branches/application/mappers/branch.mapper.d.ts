import { Branch } from '../../domain/entities/branch.entity.js';
import { BranchResponseDto } from '../dto/branch-response.dto.js';
import { BranchModel } from '../../infrastructure/persistence/models/branch.model.js';
export declare class BranchMapper {
    static toDomain(model: BranchModel): Branch;
    static toResponse(entity: Branch): BranchResponseDto;
    static toPersistence(entity: Branch): Partial<BranchModel>;
}
