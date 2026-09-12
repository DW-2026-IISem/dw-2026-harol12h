import { Collection } from '../../domain/entities/collection.entity';
import { CollectionResponseDto } from '../dto/collection-response.dto';
import { CollectionModel } from '../../infrastructure/persistence/models/collection.model';

export class CollectionMapper {
  static toDomain(model: CollectionModel): Collection {
    return Collection.reconstitute({
      id: model.id,
      name: model.name,
      description: model.description ?? undefined,
      isActive: model.isActive,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Collection): CollectionResponseDto {
    return {
      id: entity.id!,
      name: entity.name,
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Collection): Partial<CollectionModel> {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description ?? null,
      isActive: entity.isActive,
    };
  }
}
