var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { OrderModel } from '../models/order.model.js';
let OrderRepository = class OrderRepository {
    async create(order) {
        return await OrderModel.create(order);
    }
    async findById(id) {
        return await OrderModel.findByPk(id);
    }
    async findAll() {
        return await OrderModel.findAll();
    }
    async update(order) {
        const existing = await OrderModel.findByPk(order.id);
        if (!existing)
            throw new Error('Order not found');
        return await existing.update(order);
    }
    async delete(id) {
        const existing = await OrderModel.findByPk(id);
        if (existing)
            await existing.destroy();
    }
};
OrderRepository = __decorate([
    Injectable()
], OrderRepository);
export { OrderRepository };
//# sourceMappingURL=order.repository.js.map