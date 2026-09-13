import { Collection } from '../../domain/entities/collection.entity.js';
import { CollectionResponseDto } from '../dto/collection-response.dto.js';
import { CollectionModel } from '../../infrastructure/persistence/models/collection.model.js';
export declare class CollectionMapper {
    static toDomain(model: CollectionModel): Collection;
    static toResponse(entity: Collection): CollectionResponseDto;
    static toPersistence(entity: Collection): Partial<CollectionModel>;
}
