import type { IProductRepository } from '../../domain/interfaces/product-repository.interface.js';
import { UpdateProductDto } from '../dto/update-product.dto.js';
export declare class UpdateProductUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(id: number, dto: UpdateProductDto): Promise<import("../dto/product-response.dto.js").ProductResponseDto>;
}
