import { Product } from '../../domain/entities/product.entity.js';
import { ProductModel } from '../../infrastructure/persistence/models/product.model.js';
import { Status } from '../../../../../common/enums/status.enum.js';

export class ProductMapper {
  static toDomain(model: ProductModel): Product {
    return Product.create({
      name: model.name,
      brand: model.brand,
      price: model.price,
      minStock: model.minStock,
      quantity: model.quantity,
      productTypeId: model.productTypeId,
      collectionId: model.collectionId,
      status: model.status as Status,
    });
  }

  static toPersistence(entity: Product) {
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

  static toResponse(model: ProductModel) {
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
