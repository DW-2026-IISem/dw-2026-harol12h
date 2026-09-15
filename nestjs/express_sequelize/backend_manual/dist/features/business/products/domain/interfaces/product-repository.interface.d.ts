import { Product } from '../entities/product.entity.js';
import { ProductModel } from '../../infrastructure/persistence/models/product.model.js';
import { ProductFilterDto } from '../../application/dto/product-filter.dto.js';
export declare const PRODUCT_REPOSITORY = "PRODUCT_REPOSITORY";
export interface IProductRepository {
    create(product: Product): Promise<ProductModel>;
    findById(id: number): Promise<ProductModel | null>;
    findAll(filter?: ProductFilterDto): Promise<{
        items: ProductModel[];
        meta?: any;
    }>;
    update(product: Partial<Product>): Promise<ProductModel>;
    delete(id: number): Promise<void>;
}
