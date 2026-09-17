var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { buildPaginatedResult, normalizePagination, } from '../../../../../../common/utils/pagination.util.js';
import { PromotionMapper } from '../../../application/mappers/promotion.mapper.js';
import { PromotionModel } from '../models/promotion.model.js';
let PromotionRepository = class PromotionRepository {
    async create(promotion) {
        const model = await PromotionModel.create(PromotionMapper.toPersistence(promotion));
        return PromotionMapper.toDomain(model);
    }
    async update(promotion) {
        await PromotionModel.update(PromotionMapper.toPersistence(promotion), { where: { id: promotion.id } });
        const updated = await PromotionModel.findByPk(promotion.id);
        return PromotionMapper.toDomain(updated);
    }
    async delete(id) {
        await PromotionModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await PromotionModel.findByPk(id);
        return model ? PromotionMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = normalizePagination(params.page, params.limit);
        const where = {};
        if (params.active !== undefined)
            where.active = params.active;
        const { rows, count } = await PromotionModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return buildPaginatedResult(rows.map((row) => PromotionMapper.toDomain(row)), count, page, limit);
    }
};
PromotionRepository = __decorate([
    Injectable()
], PromotionRepository);
export { PromotionRepository };
//# sourceMappingURL=promotion.repository.js.map