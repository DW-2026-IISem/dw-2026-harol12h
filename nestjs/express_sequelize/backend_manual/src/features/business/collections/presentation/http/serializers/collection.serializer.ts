import { Collection } from '../../../domain/entities/collection.entity.js';
import { CollectionResponseDto } from '../../../application/dto/collection-response.dto.js';
import { CollectionMapper } from '../../../application/mappers/collection.mapper.js';

export class CollectionSerializer {
  static serialize(entity: Collection): CollectionResponseDto {
    return CollectionMapper.toResponse(entity);
  }
}
