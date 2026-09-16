import { Branch } from '../../../domain/entities/branch.entity.js';
import { BranchResponseDto } from '../../../application/dto/branch-response.dto.js';
export declare class BranchSerializer {
    static serialize(entity: Branch): BranchResponseDto;
}
