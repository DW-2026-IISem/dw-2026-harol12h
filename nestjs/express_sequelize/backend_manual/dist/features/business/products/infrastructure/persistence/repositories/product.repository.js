var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { buildPaginatedResult, normalizePagination, } from '../../../../../../common/utils/pagination.util.js';
import { ProductMapper } from '../../../application/mappers/product.mapper.js';
import { ProductModel } from '../models/product.model.js';
let ProductRepository = class ProductRepository {
    async create(product) {
        const model = await ProductModel.create(ProductMapper.toPersistence(product));
        return ProductMapper.toDomain(model);
    }
    async update(product) {
        await ProductModel.update(ProductMapper.toPersistence(product), {
            where: { id: product.id },
        });
        const updated = await ProductModel.findByPk(product.id);
        return ProductMapper.toDomain(updated);
    }
    async delete(id) {
        await ProductModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await ProductModel.findByPk(id);
        return model ? ProductMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = normalizePagination(params.page, params.limit);
        const where = {};
        if (params.search) {
            Object.assign(where, {
                [Op.or]: [
                    { name: { [Op.like]: `%${params.search}%` } },
                    { brand: { [Op.like]: `%${params.search}%` } },
                ],
            });
        }
        if (params.productTypeId) {
            where.productTypeId = params.productTypeId;
        }
        const { rows, count } = await ProductModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return buildPaginatedResult(rows.map((row) => ProductMapper.toDomain(row)), count, page, limit);
    }
};
ProductRepository = __decorate([
    Injectable()
], ProductRepository);
export { ProductRepository };
//# sourceMappingURL=product.repository.js.map