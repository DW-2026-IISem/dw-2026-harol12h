import { Status } from '../../../../../common/enums/status.enum.js';
import { Client } from '../../domain/entities/client.entity.js';
export class ClientMapper {
    static toDomain(model) {
        return Client.reconstitute({
            id: model.id,
            name: model.name,
            address: model.address ?? undefined,
            phone: model.phone ?? undefined,
            email: model.email ?? undefined,
            password: model.password ?? undefined,
            status: model.status,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            name: entity.name,
            address: entity.address,
            phone: entity.phone,
            email: entity.email,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            name: entity.name,
            address: entity.address ?? null,
            phone: entity.phone ?? null,
            email: entity.email ?? null,
            password: entity.password ?? null,
            status: entity.status ?? Status.ACTIVE,
        };
    }
}
//# sourceMappingURL=client.mapper.js.map