import type { IProductRepository } from '../../domain/interfaces/product-repository.interface.js';
export declare class GetProductUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(id: number): Promise<{
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
