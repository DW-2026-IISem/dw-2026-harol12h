import { Variant } from '../../domain/entities/variant.entity.js';
import { VariantResponseDto } from '../dto/variant-response.dto.js';
import { VariantModel } from '../../infrastructure/persistence/models/variant.model.js';

export class VariantMapper {
  static toDomain(model: VariantModel): Variant {
    return Variant.reconstitute({
      id: model.id,
      productId: model.productId,
      name: model.name,
      description: model.description ?? undefined,
      isActive: model.isActive,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Variant): VariantResponseDto {
    return {
      id: entity.id!,
      productId: entity.productId,
      name: entity.name,
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Variant): Partial<VariantModel> {
    return {
      id: entity.id,
      productId: entity.productId,
      name: entity.name,
      description: entity.description ?? null,
      isActive: entity.isActive,
    };
  }
}
