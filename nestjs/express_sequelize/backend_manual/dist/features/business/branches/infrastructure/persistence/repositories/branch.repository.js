var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { buildPaginatedResult, normalizePagination, } from '../../../../../../common/utils/pagination.util.js';
import { BranchMapper } from '../../../application/mappers/branch.mapper.js';
import { BranchModel } from '../models/branch.model.js';
let BranchRepository = class BranchRepository {
    async create(branch) {
        const model = await BranchModel.create(BranchMapper.toPersistence(branch));
        return BranchMapper.toDomain(model);
    }
    async update(branch) {
        await BranchModel.update(BranchMapper.toPersistence(branch), { where: { id: branch.id } });
        const updated = await BranchModel.findByPk(branch.id);
        return BranchMapper.toDomain(updated);
    }
    async delete(id) {
        await BranchModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await BranchModel.findByPk(id);
        return model ? BranchMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = normalizePagination(params.page, params.limit);
        const where = {};
        if (params.search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${params.search}%` } },
                { description: { [Op.like]: `%${params.search}%` } },
            ];
        }
        const { rows, count } = await BranchModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return buildPaginatedResult(rows.map((row) => BranchMapper.toDomain(row)), count, page, limit);
    }
};
BranchRepository = __decorate([
    Injectable()
], BranchRepository);
export { BranchRepository };
//# sourceMappingURL=branch.repository.js.map