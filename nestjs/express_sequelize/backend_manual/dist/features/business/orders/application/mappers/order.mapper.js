import { Order } from '../../domain/entities/order.entity.js';
export class OrderMapper {
    static toEntity(model) {
        return new Order(model.id, model.clientId, model.orderDate, model.status);
    }
    static toResponse(model) {
        return {
            id: model.id,
            clientId: model.clientId,
            orderDate: model.orderDate,
            status: model.status,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        };
    }
}
//# sourceMappingURL=order.mapper.js.map