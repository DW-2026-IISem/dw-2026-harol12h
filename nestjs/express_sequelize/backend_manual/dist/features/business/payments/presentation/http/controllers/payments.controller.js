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
import { CreatePaymentUseCase } from '../../../application/use-cases/create-payment.usecase.js';
import { UpdatePaymentUseCase } from '../../../application/use-cases/update-payment.usecase.js';
import { DeletePaymentUseCase } from '../../../application/use-cases/delete-payment.usecase.js';
import { FindPaymentUseCase } from '../../../application/use-cases/find-payment.usecase.js';
import { ListPaymentsUseCase } from '../../../application/use-cases/list-payments.usecase.js';
import { CreatePaymentDto } from '../../../application/dto/create-payment.dto.js';
import { UpdatePaymentDto } from '../../../application/dto/update-payment.dto.js';
let PaymentsController = class PaymentsController {
    createPayment;
    updatePayment;
    deletePayment;
    findPayment;
    listPayments;
    constructor(createPayment, updatePayment, deletePayment, findPayment, listPayments) {
        this.createPayment = createPayment;
        this.updatePayment = updatePayment;
        this.deletePayment = deletePayment;
        this.findPayment = findPayment;
        this.listPayments = listPayments;
    }
    async create(dto) {
        return this.createPayment.execute(dto);
    }
    async list() {
        return this.listPayments.execute({});
    }
    async find(id) {
        return this.findPayment.execute(id);
    }
    async update(id, dto) {
        const payment = { id, ...dto };
        return this.updatePayment.execute(payment);
    }
    async delete(id) {
        return this.deletePayment.execute(id);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "list", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "find", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "delete", null);
PaymentsController = __decorate([
    Controller('payments'),
    __metadata("design:paramtypes", [CreatePaymentUseCase,
        UpdatePaymentUseCase,
        DeletePaymentUseCase,
        FindPaymentUseCase,
        ListPaymentsUseCase])
], PaymentsController);
export { PaymentsController };
//# sourceMappingURL=payments.controller.js.map