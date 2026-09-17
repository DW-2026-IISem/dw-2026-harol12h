import { ReturnDetail } from '../../domain/entities/return-detail.entity.js';
export class ReturnDetailMapper {
    static toDomain(model) {
        return ReturnDetail.reconstitute({
            id: model.id,
            returnId: model.returnId,
            productId: model.productId,
            quantity: model.quantity,
            reason: model.reason,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            returnId: entity.returnId,
            productId: entity.productId,
            quantity: entity.quantity,
            reason: entity.reason,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}
//# sourceMappingURL=return-detail.mapper.js.map