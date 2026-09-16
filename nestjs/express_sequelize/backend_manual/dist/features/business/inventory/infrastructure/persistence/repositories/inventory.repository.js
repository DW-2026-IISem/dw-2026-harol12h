var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { buildPaginatedResult, normalizePagination, } from '../../../../../../common/utils/pagination.util.js';
import { InventoryMapper } from '../../../application/mappers/inventory.mapper.js';
import { InventoryModel } from '../models/inventory.model.js';
let InventoryRepository = class InventoryRepository {
    async create(inventory) {
        const model = await InventoryModel.create(InventoryMapper.toPersistence(inventory));
        return InventoryMapper.toDomain(model);
    }
    async update(inventory) {
        await InventoryModel.update(InventoryMapper.toPersistence(inventory), { where: { id: inventory.id } });
        const updated = await InventoryModel.findByPk(inventory.id);
        return InventoryMapper.toDomain(updated);
    }
    async delete(id) {
        await InventoryModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await InventoryModel.findByPk(id);
        return model ? InventoryMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = normalizePagination(params.page, params.limit);
        const where = {};
        if (params.branchId)
            where.branchId = params.branchId;
        if (params.variantId)
            where.variantId = params.variantId;
        const { rows, count } = await InventoryModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return buildPaginatedResult(rows.map((row) => InventoryMapper.toDomain(row)), count, page, limit);
    }
};
InventoryRepository = __decorate([
    Injectable()
], InventoryRepository);
export { InventoryRepository };
//# sourceMappingURL=inventory.repository.js.map