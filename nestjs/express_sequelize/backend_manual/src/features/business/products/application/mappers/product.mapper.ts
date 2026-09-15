import { Product } from '../../domain/entities/product.entity.js';
import { ProductModel } from '../../infrastructure/persistence/models/product.model.js';

export class ProductMapper {
  static toEntity(model: ProductModel): Product {
    return new Product(
      model.id,
      model.name,
      model.brand,
      model.price,
      model.minStock,
      model.quantity,
      model.productTypeId,
      model.collectionId,
      model.status,
    );
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
