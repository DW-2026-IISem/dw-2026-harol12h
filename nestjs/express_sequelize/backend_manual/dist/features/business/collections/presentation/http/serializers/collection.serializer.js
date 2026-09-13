import { CollectionMapper } from '../../../application/mappers/collection.mapper.js';
export class CollectionSerializer {
    static serialize(entity) {
        return CollectionMapper.toResponse(entity);
    }
}
//# sourceMappingURL=collection.serializer.js.map