import { Order } from '../../domain/entities/order.entity.js';
export class OrderMapper {
    static toDomain(model) {
        return Order.reconstitute({
            id: model.id,
            clientId: model.clientId,
            orderDate: model.orderDate,
            status: model.status,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            clientId: entity.clientId,
            orderDate: entity.orderDate,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            clientId: entity.clientId,
            orderDate: entity.orderDate,
            status: entity.status,
        };
    }
}
//# sourceMappingURL=order.mapper.js.map