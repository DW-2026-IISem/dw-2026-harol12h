var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ProductsController } from './infrastructure/controllers/products.controller.js';
import { ProductRepository } from './infrastructure/persistence/repositories/product.repository.js';
import { PRODUCT_REPOSITORY } from './domain/interfaces/product-repository.interface.js';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case.js';
import { GetProductUseCase } from './application/use-cases/get-product.use-case.js';
import { ListProductsUseCase } from './application/use-cases/list-products.use-case.js';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case.js';
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case.js';
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    Module({
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
], ProductsModule);
export { ProductsModule };
//# sourceMappingURL=products.module.js.map