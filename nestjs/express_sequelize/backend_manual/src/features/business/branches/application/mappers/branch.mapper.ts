import { Branch } from '../../domain/entities/branch.entity.js';
import { BranchResponseDto } from '../dto/branch-response.dto.js';
import { BranchModel } from '../../infrastructure/persistence/models/branch.model.js';

export class BranchMapper {
  static toDomain(model: BranchModel): Branch {
    return Branch.reconstitute({
      id: model.id,
      name: model.name,
      description: model.description ?? undefined,
      isActive: model.isActive,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Branch): BranchResponseDto {
    return {
      id: entity.id!,
      name: entity.name,
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Branch): Partial<BranchModel> {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description ?? null,
      isActive: entity.isActive,
    };
  }
}
