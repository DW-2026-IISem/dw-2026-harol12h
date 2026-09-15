import { Status } from '../../../../../common/enums/status.enum.js';
import { Product } from '../../domain/entities/product.entity.js';
export class ProductMapper {
    static toDomain(model) {
        return Product.reconstitute({
            id: model.id,
            name: model.name,
            brand: model.brand,
            price: Number(model.price),
            minStock: model.minStock,
            quantity: model.quantity,
            productTypeId: model.productTypeId,
            status: model.status,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            name: entity.name,
            brand: entity.brand,
            price: entity.price,
            minStock: entity.minStock,
            quantity: entity.quantity,
            productTypeId: entity.productTypeId,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            name: entity.name,
            brand: entity.brand,
            price: entity.price,
            minStock: entity.minStock,
            quantity: entity.quantity,
            productTypeId: entity.productTypeId,
            status: entity.status ?? Status.ACTIVE,
        };
    }
}
//# sourceMappingURL=product.mapper.js.map