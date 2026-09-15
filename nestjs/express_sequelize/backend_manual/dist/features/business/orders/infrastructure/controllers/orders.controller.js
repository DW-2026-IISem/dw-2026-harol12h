var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case.js';
import { GetOrderUseCase } from '../../application/use-cases/get-order.use-case.js';
import { ListOrdersUseCase } from '../../application/use-cases/list-orders.use-case.js';
import { UpdateOrderUseCase } from '../../application/use-cases/update-order.use-case.js';
import { DeleteOrderUseCase } from '../../application/use-cases/delete-order.use-case.js';
import { CreateOrderDto } from '../../application/dto/create-order.dto.js';
import { UpdateOrderDto } from '../../application/dto/update-order.dto.js';
let OrdersController = class OrdersController {
    createOrder;
    getOrder;
    listOrders;
    updateOrder;
    deleteOrder;
    constructor(createOrder, getOrder, listOrders, updateOrder, deleteOrder) {
        this.createOrder = createOrder;
        this.getOrder = getOrder;
        this.listOrders = listOrders;
        this.updateOrder = updateOrder;
        this.deleteOrder = deleteOrder;
    }
    async create(dto) {
        return this.createOrder.execute(dto);
    }
    async findAll() {
        return this.listOrders.execute();
    }
    async findOne(id) {
        return this.getOrder.execute(id);
    }
    async update(id, dto) {
        return this.updateOrder.execute(id, dto);
    }
    async remove(id) {
        await this.deleteOrder.execute(id);
        return { message: `Order ${id} deleted` };
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
OrdersController = __decorate([
    Controller('orders'),
    __metadata("design:paramtypes", [CreateOrderUseCase,
        GetOrderUseCase,
        ListOrdersUseCase,
        UpdateOrderUseCase,
        DeleteOrderUseCase])
], OrdersController);
export { OrdersController };
//# sourceMappingURL=orders.controller.js.map