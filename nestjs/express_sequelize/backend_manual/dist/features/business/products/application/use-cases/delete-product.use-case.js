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
import { ProductNotFoundException } from '../../domain/exceptions/product-not-found.exception.js';
import { PRODUCT_REPOSITORY } from '../../domain/interfaces/product-repository.interface.js';
let DeleteProductUseCase = class DeleteProductUseCase {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new ProductNotFoundException(id);
        }
        await this.productRepository.delete(id);
    }
};
DeleteProductUseCase = __decorate([
    Injectable(),
    __param(0, Inject(PRODUCT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteProductUseCase);
export { DeleteProductUseCase };
//# sourceMappingURL=delete-product.use-case.js.map