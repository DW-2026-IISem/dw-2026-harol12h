import { Module } from '@nestjs/common';
import { ProductsController } from './infrastructure/controllers/products.controller.js';
import { ProductRepository } from './infrastructure/persistence/repositories/product.repository.js';
import { PRODUCT_REPOSITORY } from './domain/interfaces/product-repository.interface.js';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case.js';
import { GetProductUseCase } from './application/use-cases/get-product.use-case.js';
import { ListProductsUseCase } from './application/use-cases/list-products.use-case.js';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case.js';
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case.js';

@Module({
  controllers: [ProductsController],
  providers: [
    { provide: PRODUCT_REPOSITORY, useClass: ProductRepository },
    CreateProductUseCase,
    GetProductUseCase,
    ListProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
  exports: [],
})
export class ProductsModule {}
