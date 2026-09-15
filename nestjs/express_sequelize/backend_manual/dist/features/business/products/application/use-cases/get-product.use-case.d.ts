import type { IProductRepository } from '../../domain/interfaces/product-repository.interface.js';
export declare class GetProductUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(id: number): Promise<import("../dto/product-response.dto.js").ProductResponseDto>;
}
