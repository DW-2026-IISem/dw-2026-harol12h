import { Collection } from '../../../domain/entities/collection.entity.js';
import { CollectionResponseDto } from '../../../application/dto/collection-response.dto.js';
export declare class CollectionSerializer {
    static serialize(entity: Collection): CollectionResponseDto;
}
