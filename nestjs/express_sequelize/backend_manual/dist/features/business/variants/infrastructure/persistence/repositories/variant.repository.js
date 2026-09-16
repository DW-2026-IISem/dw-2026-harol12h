var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { buildPaginatedResult, normalizePagination, } from '../../../../../../common/utils/pagination.util.js';
import { VariantMapper } from '../../../application/mappers/variant.mapper.js';
import { VariantModel } from '../models/variant.model.js';
let VariantRepository = class VariantRepository {
    async create(variant) {
        const model = await VariantModel.create(VariantMapper.toPersistence(variant));
        return VariantMapper.toDomain(model);
    }
    async update(variant) {
        await VariantModel.update(VariantMapper.toPersistence(variant), { where: { id: variant.id } });
        const updated = await VariantModel.findByPk(variant.id);
        return VariantMapper.toDomain(updated);
    }
    async delete(id) {
        await VariantModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await VariantModel.findByPk(id);
        return model ? VariantMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = normalizePagination(params.page, params.limit);
        const where = {};
        if (params.productId)
            where.productId = params.productId;
        if (params.search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${params.search}%` } },
                { description: { [Op.like]: `%${params.search}%` } },
            ];
        }
        const { rows, count } = await VariantModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return buildPaginatedResult(rows.map((row) => VariantMapper.toDomain(row)), count, page, limit);
    }
};
VariantRepository = __decorate([
    Injectable()
], VariantRepository);
export { VariantRepository };
//# sourceMappingURL=variant.repository.js.map