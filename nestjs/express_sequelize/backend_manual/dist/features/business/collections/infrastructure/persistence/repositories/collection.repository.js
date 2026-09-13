var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { buildPaginatedResult, normalizePagination, } from '../../../../../../common/utils/pagination.util.js';
import { CollectionMapper } from '../../../application/mappers/collection.mapper.js';
import { CollectionModel } from '../models/collection.model.js';
let CollectionRepository = class CollectionRepository {
    async create(collection) {
        const model = await CollectionModel.create(CollectionMapper.toPersistence(collection));
        return CollectionMapper.toDomain(model);
    }
    async update(collection) {
        await CollectionModel.update(CollectionMapper.toPersistence(collection), { where: { id: collection.id } });
        const updated = await CollectionModel.findByPk(collection.id);
        return CollectionMapper.toDomain(updated);
    }
    async delete(id) {
        await CollectionModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await CollectionModel.findByPk(id);
        return model ? CollectionMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = normalizePagination(params.page, params.limit);
        const where = params.search
            ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${params.search}%` } },
                    { description: { [Op.like]: `%${params.search}%` } },
                ],
            }
            : {};
        const { rows, count } = await CollectionModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return buildPaginatedResult(rows.map((row) => CollectionMapper.toDomain(row)), count, page, limit);
    }
};
CollectionRepository = __decorate([
    Injectable()
], CollectionRepository);
export { CollectionRepository };
//# sourceMappingURL=collection.repository.js.map