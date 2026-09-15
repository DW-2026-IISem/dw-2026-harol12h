import type { IProductRepository } from '../../domain/interfaces/product-repository.interface.js';
import { CreateProductDto } from '../dto/create-product.dto.js';
export declare class CreateProductUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(dto: CreateProductDto): Promise<{
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
    }>;
}
