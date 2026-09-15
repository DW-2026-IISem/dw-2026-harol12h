import { Product } from '../../domain/entities/product.entity.js';
export class ProductMapper {
    static toDomain(model) {
        return Product.create({
            name: model.name,
            brand: model.brand,
            price: model.price,
            minStock: model.minStock,
            quantity: model.quantity,
            productTypeId: model.productTypeId,
            collectionId: model.collectionId,
            status: model.status,
        });
    }
    static toPersistence(entity) {
        return {
            id: entity.id ?? undefined,
            name: entity.name,
            brand: entity.brand,
            price: entity.price,
            minStock: entity.minStock,
            quantity: entity.quantity,
            productTypeId: entity.productTypeId,
            collectionId: entity.collectionId,
            status: entity.status,
        };
    }
    static toResponse(model) {
        return {
            id: model.id,
            name: model.name,
            brand: model.brand,
            price: model.price,
            minStock: model.minStock,
            quantity: model.quantity,
            productTypeId: model.productTypeId,
            collectionId: model.collectionId,
            status: model.status,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        };
    }
}
//# sourceMappingURL=product.mapper.js.map