import { Return } from '../../domain/entities/return.entity.js';
export class ReturnMapper {
    static toDomain(model) {
        return Return.reconstitute({
            id: model.id,
            orderId: model.orderId,
            date: model.date,
            reason: model.reason,
            total: model.total,
            status: model.status,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            orderId: entity.orderId,
            date: entity.date,
            reason: entity.reason,
            total: entity.total,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}
//# sourceMappingURL=return.mapper.js.map