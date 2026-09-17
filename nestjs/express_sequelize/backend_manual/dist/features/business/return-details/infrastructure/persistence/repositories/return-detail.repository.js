var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { buildPaginatedResult, normalizePagination, } from '../../../../../../common/utils/pagination.util.js';
import { ReturnDetailMapper } from '../../../application/mappers/return-detail.mapper.js';
import { ReturnDetailModel } from '../models/return-detail.model.js';
let ReturnDetailRepository = class ReturnDetailRepository {
    async create(detail) {
        const model = await ReturnDetailModel.create(ReturnDetailMapper.toPersistence(detail));
        return ReturnDetailMapper.toDomain(model);
    }
    async update(detail) {
        await ReturnDetailModel.update(ReturnDetailMapper.toPersistence(detail), { where: { id: detail.id } });
        const updated = await ReturnDetailModel.findByPk(detail.id);
        return ReturnDetailMapper.toDomain(updated);
    }
    async delete(id) {
        await ReturnDetailModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await ReturnDetailModel.findByPk(id);
        return model ? ReturnDetailMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = normalizePagination(params.page, params.limit);
        const where = {};
        if (params.returnId)
            where.returnId = params.returnId;
        if (params.productId)
            where.productId = params.productId;
        const { rows, count } = await ReturnDetailModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return buildPaginatedResult(rows.map((row) => ReturnDetailMapper.toDomain(row)), count, page, limit);
    }
};
ReturnDetailRepository = __decorate([
    Injectable()
], ReturnDetailRepository);
export { ReturnDetailRepository };
//# sourceMappingURL=return-detail.repository.js.map