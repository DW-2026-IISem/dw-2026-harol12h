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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { ParsePositiveIntPipe } from '../../../../../../common/pipes/parse-positive-int.pipe.js';
import { CreateOrderDetailUseCase } from '../../../application/use-cases/create-order-detail.use-case.js';
import { UpdateOrderDetailUseCase } from '../../../application/use-cases/update-order-detail.use-case.js';
import { DeleteOrderDetailUseCase } from '../../../application/use-cases/delete-order-detail.use-case.js';
import { GetOrderDetailUseCase } from '../../../application/use-cases/get-order-detail.use-case.js';
import { ListOrderDetailsUseCase } from '../../../application/use-cases/list-order-details.use-case.js';
let OrderDetailsController = class OrderDetailsController {
    createOrderDetailUseCase;
    updateOrderDetailUseCase;
    deleteOrderDetailUseCase;
    getOrderDetailUseCase;
    listOrderDetailsUseCase;
    constructor(createOrderDetailUseCase, updateOrderDetailUseCase, deleteOrderDetailUseCase, getOrderDetailUseCase, listOrderDetailsUseCase) {
        this.createOrderDetailUseCase = createOrderDetailUseCase;
        this.updateOrderDetailUseCase = updateOrderDetailUseCase;
        this.deleteOrderDetailUseCase = deleteOrderDetailUseCase;
        this.getOrderDetailUseCase = getOrderDetailUseCase;
        this.listOrderDetailsUseCase = listOrderDetailsUseCase;
    }
    create(dto) {
        return this.createOrderDetailUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listOrderDetailsUseCase.execute(filter);
    }
    findOne(id) {
        return this.getOrderDetailUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateOrderDetailUseCase.execute(id, dto);
    }
    remove(id) {
        return this.deleteOrderDetailUseCase.execute(id);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Crear detalle de pedido' }),
    ApiCreatedResponse(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderDetailsController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Listar detalles de pedido' }),
    ApiOkResponse(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderDetailsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Obtener detalle de pedido por ID' }),
    ApiOkResponse(),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderDetailsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    ApiOperation({ summary: 'Actualizar detalle de pedido' }),
    ApiOkResponse(),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], OrderDetailsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Eliminar detalle de pedido' }),
    ApiNoContentResponse(),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderDetailsController.prototype, "remove", null);
OrderDetailsController = __decorate([
    ApiTags('OrderDetails'),
    Controller('order-details'),
    __metadata("design:paramtypes", [CreateOrderDetailUseCase,
        UpdateOrderDetailUseCase,
        DeleteOrderDetailUseCase,
        GetOrderDetailUseCase,
        ListOrderDetailsUseCase])
], OrderDetailsController);
export { OrderDetailsController };
//# sourceMappingURL=order-details.controller.js.map