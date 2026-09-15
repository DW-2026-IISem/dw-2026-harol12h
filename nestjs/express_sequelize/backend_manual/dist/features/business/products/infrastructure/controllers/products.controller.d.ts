import { CreateProductDto } from '../../application/dto/create-product.dto.js';
import { UpdateProductDto } from '../../application/dto/update-product.dto.js';
import { ProductFilterDto } from '../../application/dto/product-filter.dto.js';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case.js';
import { GetProductUseCase } from '../../application/use-cases/get-product.use-case.js';
import { ListProductsUseCase } from '../../application/use-cases/list-products.use-case.js';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.use-case.js';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.use-case.js';
export declare class ProductsController {
    private readonly createProduct;
    private readonly getProduct;
    private readonly listProducts;
    private readonly updateProduct;
    private readonly deleteProduct;
    constructor(createProduct: CreateProductUseCase, getProduct: GetProductUseCase, listProducts: ListProductsUseCase, updateProduct: UpdateProductUseCase, deleteProduct: DeleteProductUseCase);
    create(dto: CreateProductDto): Promise<import("../../application/dto/product-response.dto.js").ProductResponseDto>;
    list(filter: ProductFilterDto): Promise<{
        items: import("../../application/dto/product-response.dto.js").ProductResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
    get(id: number): Promise<import("../../application/dto/product-response.dto.js").ProductResponseDto>;
    update(id: number, dto: UpdateProductDto): Promise<import("../../application/dto/product-response.dto.js").ProductResponseDto>;
    delete(id: number): Promise<void>;
}
