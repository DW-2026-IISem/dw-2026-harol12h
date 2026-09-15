import type { IProductRepository } from '../../domain/interfaces/product-repository.interface.js';
import { ProductFilterDto } from '../dto/product-filter.dto.js';
export declare class ListProductsUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(filter: ProductFilterDto): Promise<{
        items: {
            id: any;
            name: string;
            brand: string;
            price: number;
            minStock: number;
            quantity: number;
            productTypeId: number;
            collectionId: number;
            status: string;
            createdAt: any;
            updatedAt: any;
        }[];
        meta: any;
    }>;
}
