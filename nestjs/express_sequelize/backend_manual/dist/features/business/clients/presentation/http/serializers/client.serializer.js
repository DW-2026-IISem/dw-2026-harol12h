import { ClientMapper } from '../../../application/mappers/client.mapper.js';
export class ClientSerializer {
    static serialize(entity) {
        return ClientMapper.toResponse(entity);
    }
}
//# sourceMappingURL=client.serializer.js.map