import { ProductModel } from '../models/product.model.js';
import { Product } from '../../../domain/entities/product.entity.js';
import { ProductFilterDto } from '../../../application/dto/product-filter.dto.js';
export declare class ProductRepository {
    create(product: Product): Promise<ProductModel>;
    update(product: Product): Promise<ProductModel>;
    findById(id: number): Promise<ProductModel | null>;
    findAll(filter?: ProductFilterDto): Promise<{
        items: ProductModel[];
    }>;
    delete(id: number): Promise<void>;
}
