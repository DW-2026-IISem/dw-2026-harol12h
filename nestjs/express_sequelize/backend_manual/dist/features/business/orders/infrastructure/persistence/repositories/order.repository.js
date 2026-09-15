var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { buildPaginatedResult, normalizePagination, } from '../../../../../../common/utils/pagination.util.js';
import { OrderMapper } from '../../../application/mappers/order.mapper.js';
import { OrderModel } from '../models/order.model.js';
let OrderRepository = class OrderRepository {
    async create(order) {
        const model = await OrderModel.create(OrderMapper.toPersistence(order));
        return OrderMapper.toDomain(model);
    }
    async update(order) {
        await OrderModel.update(OrderMapper.toPersistence(order), {
            where: { id: order.id },
        });
        const updated = await OrderModel.findByPk(order.id);
        return OrderMapper.toDomain(updated);
    }
    async delete(id) {
        await OrderModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await OrderModel.findByPk(id);
        return model ? OrderMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = normalizePagination(params.page, params.limit);
        const where = {};
        if (params.clientId)
            where.clientId = params.clientId;
        if (params.status)
            where.status = params.status;
        const { rows, count } = await OrderModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return buildPaginatedResult(rows.map((row) => OrderMapper.toDomain(row)), count, page, limit);
    }
};
OrderRepository = __decorate([
    Injectable()
], OrderRepository);
export { OrderRepository };
//# sourceMappingURL=order.repository.js.map