import type { IProductRepository } from '../../domain/interfaces/product-repository.interface.js';
import { ProductFilterDto } from '../dto/product-filter.dto.js';
export declare class ListProductsUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(filter: ProductFilterDto): Promise<{
        items: import("../dto/product-response.dto.js").ProductResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
}
