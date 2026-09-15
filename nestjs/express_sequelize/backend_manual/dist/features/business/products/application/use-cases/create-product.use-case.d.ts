import * as productRepositoryInterface from '../../domain/interfaces/product-repository.interface.js';
import { CreateProductDto } from '../dto/create-product.dto.js';
export declare class CreateProductUseCase {
    private readonly productRepository;
    constructor(productRepository: productRepositoryInterface.IProductRepository);
    execute(dto: CreateProductDto): Promise<import("../dto/product-response.dto.js").ProductResponseDto>;
}
