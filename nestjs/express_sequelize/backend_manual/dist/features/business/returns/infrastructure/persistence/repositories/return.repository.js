var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { buildPaginatedResult, normalizePagination, } from '../../../../../../common/utils/pagination.util.js';
import { ReturnMapper } from '../../../application/mappers/return.mapper.js';
import { ReturnModel } from '../models/return.model.js';
let ReturnRepository = class ReturnRepository {
    async create(returnEntity) {
        const model = await ReturnModel.create(ReturnMapper.toPersistence(returnEntity));
        return ReturnMapper.toDomain(model);
    }
    async update(returnEntity) {
        await ReturnModel.update(ReturnMapper.toPersistence(returnEntity), { where: { id: returnEntity.id } });
        const updated = await ReturnModel.findByPk(returnEntity.id);
        return ReturnMapper.toDomain(updated);
    }
    async delete(id) {
        await ReturnModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await ReturnModel.findByPk(id);
        return model ? ReturnMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = normalizePagination(params.page, params.limit);
        const where = {};
        if (params.orderId)
            where.orderId = params.orderId;
        if (params.status)
            where.status = params.status;
        const { rows, count } = await ReturnModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return buildPaginatedResult(rows.map((row) => ReturnMapper.toDomain(row)), count, page, limit);
    }
};
ReturnRepository = __decorate([
    Injectable()
], ReturnRepository);
export { ReturnRepository };
//# sourceMappingURL=return.repository.js.map