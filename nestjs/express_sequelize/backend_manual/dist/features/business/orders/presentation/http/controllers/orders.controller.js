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
import { CreateOrderDto } from '../../../application/dto/create-order.dto.js';
import { UpdateOrderDto } from '../../../application/dto/update-order.dto.js';
import { OrderFilterDto } from '../../../application/dto/order-filter.dto.js';
import { OrderResponseDto } from '../../../application/dto/order-response.dto.js';
import { CreateOrderUseCase } from '../../../application/use-cases/create-order.use-case.js';
import { UpdateOrderUseCase } from '../../../application/use-cases/update-order.use-case.js';
import { DeleteOrderUseCase } from '../../../application/use-cases/delete-order.use-case.js';
import { GetOrderUseCase } from '../../../application/use-cases/get-order.use-case.js';
import { ListOrdersUseCase } from '../../../application/use-cases/list-orders.use-case.js';
let OrdersController = class OrdersController {
    createOrderUseCase;
    updateOrderUseCase;
    deleteOrderUseCase;
    getOrderUseCase;
    listOrdersUseCase;
    constructor(createOrderUseCase, updateOrderUseCase, deleteOrderUseCase, getOrderUseCase, listOrdersUseCase) {
        this.createOrderUseCase = createOrderUseCase;
        this.updateOrderUseCase = updateOrderUseCase;
        this.deleteOrderUseCase = deleteOrderUseCase;
        this.getOrderUseCase = getOrderUseCase;
        this.listOrdersUseCase = listOrdersUseCase;
    }
    create(dto) {
        return this.createOrderUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listOrdersUseCase.execute(filter);
    }
    findOne(id) {
        return this.getOrderUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateOrderUseCase.execute(id, dto);
    }
    remove(id) {
        return this.deleteOrderUseCase.execute(id);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Crear un pedido' }),
    ApiCreatedResponse({ type: OrderResponseDto }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Listar pedidos' }),
    ApiOkResponse({ type: [OrderResponseDto] }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrderFilterDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Obtener un pedido por ID' }),
    ApiOkResponse({ type: OrderResponseDto }),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    ApiOperation({ summary: 'Actualizar un pedido' }),
    ApiOkResponse({ type: OrderResponseDto }),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Eliminar un pedido' }),
    ApiNoContentResponse(),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "remove", null);
OrdersController = __decorate([
    ApiTags('Orders'),
    Controller('orders'),
    __metadata("design:paramtypes", [CreateOrderUseCase,
        UpdateOrderUseCase,
        DeleteOrderUseCase,
        GetOrderUseCase,
        ListOrdersUseCase])
], OrdersController);
export { OrdersController };
//# sourceMappingURL=orders.controller.js.map