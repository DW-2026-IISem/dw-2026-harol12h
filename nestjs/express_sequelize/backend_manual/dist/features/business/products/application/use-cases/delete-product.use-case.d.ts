import type { IProductRepository } from '../../domain/interfaces/product-repository.interface.js';
export declare class DeleteProductUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(id: number): Promise<void>;
}
