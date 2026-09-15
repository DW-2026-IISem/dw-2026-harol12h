import { Product } from '../../domain/entities/product.entity.js';
import { ProductResponseDto } from '../dto/product-response.dto.js';
import { ProductModel } from '../../infrastructure/persistence/models/product.model.js';
export declare class ProductMapper {
    static toDomain(model: ProductModel): Product;
    static toResponse(entity: Product): ProductResponseDto;
    static toPersistence(entity: Product): Partial<ProductModel>;
}
