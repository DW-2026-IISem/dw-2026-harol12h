var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '../../domain/interfaces/product-repository.interface.js';
import { Product } from '../../domain/entities/product.entity.js';
import { ProductMapper } from '../mappers/product.mapper.js';
let CreateProductUseCase = class CreateProductUseCase {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(dto) {
        const product = Product.create({
            name: dto.name,
            brand: dto.brand,
            price: dto.price,
            minStock: dto.minStock,
            quantity: dto.quantity,
            productTypeId: dto.productTypeId,
            collectionId: dto.collectionId,
            status: dto.status,
        });
        const created = await this.productRepository.create(product);
        return ProductMapper.toResponse(created);
    }
};
CreateProductUseCase = __decorate([
    Injectable(),
    __param(0, Inject(PRODUCT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateProductUseCase);
export { CreateProductUseCase };
//# sourceMappingURL=create-product.use-case.js.map