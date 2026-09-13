import { Collection } from '../../../domain/entities/collection.entity';
import { CollectionResponseDto } from '../../../application/dto/collection-response.dto';
import { CollectionMapper } from '../../../application/mappers/collection.mapper';

export class CollectionSerializer {
  static serialize(entity: Collection): CollectionResponseDto {
    return CollectionMapper.toResponse(entity);
  }
}
