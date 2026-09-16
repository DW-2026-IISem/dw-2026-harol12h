import { Branch } from '../../../domain/entities/branch.entity.js';
import { BranchResponseDto } from '../../../application/dto/branch-response.dto.js';
import { BranchMapper } from '../../../application/mappers/branch.mapper.js';

export class BranchSerializer {
  static serialize(entity: Branch): BranchResponseDto {
    return BranchMapper.toResponse(entity);
  }
}
