var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { ProductModel } from '../models/product.model.js';
import { ProductMapper } from '../../../application/mappers/product.mapper.js';
let ProductRepository = class ProductRepository {
    async create(product) {
        return await ProductModel.create(ProductMapper.toPersistence(product));
    }
    async update(product) {
        await ProductModel.update(ProductMapper.toPersistence(product), {
            where: { id: product.id },
        });
        const updated = await ProductModel.findByPk(product.id);
        return updated;
    }
    async findById(id) {
        return await ProductModel.findByPk(id);
    }
    async findAll(filter) {
        const rows = await ProductModel.findAll({ where: { ...filter } });
        return { items: rows };
    }
    async delete(id) {
        const existing = await ProductModel.findByPk(id);
        if (existing)
            await existing.destroy();
    }
};
ProductRepository = __decorate([
    Injectable()
], ProductRepository);
export { ProductRepository };
//# sourceMappingURL=product.repository.js.map