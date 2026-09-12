var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { buildPaginatedResult, normalizePagination, } from '../../../../../../common/utils/pagination.util.js';
import { ClientMapper } from '../../../application/mappers/client.mapper.js';
import { ClientModel } from '../models/client.model.js';
let ClientRepository = class ClientRepository {
    async create(client) {
        const model = await ClientModel.create(ClientMapper.toPersistence(client));
        return ClientMapper.toDomain(model);
    }
    async update(id, data) {
        await ClientModel.update(data, {
            where: { id },
        });
        const updated = await ClientModel.findByPk(id);
        return updated ? ClientMapper.toDomain(updated) : null;
    }
    async delete(id) {
        await ClientModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await ClientModel.findByPk(id);
        return model ? ClientMapper.toDomain(model) : null;
    }
    async findByEmail(email) {
        const model = await ClientModel.findOne({ where: { email } });
        return model ? ClientMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = normalizePagination(params.page, params.limit);
        const where = params.search
            ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${params.search}%` } },
                    { email: { [Op.like]: `%${params.search}%` } },
                ],
            }
            : {};
        const { rows, count } = await ClientModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return buildPaginatedResult(rows.map((row) => ClientMapper.toDomain(row)), count, page, limit);
    }
};
ClientRepository = __decorate([
    Injectable()
], ClientRepository);
export { ClientRepository };
//# sourceMappingURL=client.repository.js.map