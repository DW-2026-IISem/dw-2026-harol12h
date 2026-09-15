import { OrderMapper } from '../../../application/mappers/order.mapper.js';
export class OrderSerializer {
    static serialize(entity) {
        return OrderMapper.toResponse(entity);
    }
}
//# sourceMappingURL=order.serializer.js.map