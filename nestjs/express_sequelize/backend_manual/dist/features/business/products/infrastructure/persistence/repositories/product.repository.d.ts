import { Product } from '../../../domain/entities/product.entity.js';
import { IProductRepository, ProductFindAllParams } from '../../../domain/interfaces/product-repository.interface.js';
export declare class ProductRepository implements IProductRepository {
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<Product>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Product | null>;
    findAll(params: ProductFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<Product>>;
}
