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
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../../application/dto/create-product.dto.js';
import { UpdateProductDto } from '../../application/dto/update-product.dto.js';
import { ProductFilterDto } from '../../application/dto/product-filter.dto.js';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case.js';
import { GetProductUseCase } from '../../application/use-cases/get-product.use-case.js';
import { ListProductsUseCase } from '../../application/use-cases/list-products.use-case.js';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.use-case.js';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.use-case.js';
let ProductsController = class ProductsController {
    createProduct;
    getProduct;
    listProducts;
    updateProduct;
    deleteProduct;
    constructor(createProduct, getProduct, listProducts, updateProduct, deleteProduct) {
        this.createProduct = createProduct;
        this.getProduct = getProduct;
        this.listProducts = listProducts;
        this.updateProduct = updateProduct;
        this.deleteProduct = deleteProduct;
    }
    async create(dto) {
        return this.createProduct.execute(dto);
    }
    async list(filter) {
        return this.listProducts.execute(filter);
    }
    async get(id) {
        return this.getProduct.execute(id);
    }
    async update(id, dto) {
        return this.updateProduct.execute(id, dto);
    }
    async delete(id) {
        return this.deleteProduct.execute(id);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductFilterDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "list", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "get", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "delete", null);
ProductsController = __decorate([
    ApiTags('Products'),
    Controller('api/products'),
    __metadata("design:paramtypes", [CreateProductUseCase,
        GetProductUseCase,
        ListProductsUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase])
], ProductsController);
export { ProductsController };
//# sourceMappingURL=products.controller.js.map