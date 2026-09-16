var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { buildPaginatedResult, normalizePagination, } from '../../../../../../common/utils/pagination.util.js';
import { PaymentMapper } from '../../../application/mappers/payment.mapper.js';
import { PaymentModel } from '../models/payment.model.js';
let PaymentRepository = class PaymentRepository {
    async create(payment) {
        const model = await PaymentModel.create(PaymentMapper.toPersistence(payment));
        return PaymentMapper.toDomain(model);
    }
    async update(payment) {
        await PaymentModel.update(PaymentMapper.toPersistence(payment), { where: { id: payment.id } });
        const updated = await PaymentModel.findByPk(payment.id);
        return PaymentMapper.toDomain(updated);
    }
    async delete(id) {
        await PaymentModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await PaymentModel.findByPk(id);
        return model ? PaymentMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = normalizePagination(params.page, params.limit);
        const where = {};
        if (params.orderId)
            where.orderId = params.orderId;
        if (params.status)
            where.status = params.status;
        const { rows, count } = await PaymentModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return buildPaginatedResult(rows.map((row) => PaymentMapper.toDomain(row)), count, page, limit);
    }
};
PaymentRepository = __decorate([
    Injectable()
], PaymentRepository);
export { PaymentRepository };
//# sourceMappingURL=payment.repository.js.map