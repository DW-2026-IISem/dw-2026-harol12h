import { VariantMapper } from '../../../application/mappers/variant.mapper.js';
export class VariantSerializer {
    static serialize(entity) {
        return VariantMapper.toResponse(entity);
    }
}
//# sourceMappingURL=variant.serializer.js.map