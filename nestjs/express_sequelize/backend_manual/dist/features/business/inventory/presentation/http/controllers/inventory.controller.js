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
import { CreateInventoryDto } from '../../../application/dto/create-inventory.dto.js';
import { UpdateInventoryDto } from '../../../application/dto/update-inventory.dto.js';
import { InventoryFilterDto } from '../../../application/dto/inventory-filter.dto.js';
import { InventoryResponseDto } from '../../../application/dto/inventory-response.dto.js';
import { CreateInventoryUseCase } from '../../../application/use-cases/create-inventory.use-case.js';
import { UpdateInventoryUseCase } from '../../../application/use-cases/update-inventory.use-case.js';
import { DeleteInventoryUseCase } from '../../../application/use-cases/delete-inventory.use-case.js';
import { GetInventoryUseCase } from '../../../application/use-cases/get-inventory.use-case.js';
import { ListInventoryUseCase } from '../../../application/use-cases/list-inventory.use-case.js';
let InventoryController = class InventoryController {
    createInventoryUseCase;
    updateInventoryUseCase;
    deleteInventoryUseCase;
    getInventoryUseCase;
    listInventoryUseCase;
    constructor(createInventoryUseCase, updateInventoryUseCase, deleteInventoryUseCase, getInventoryUseCase, listInventoryUseCase) {
        this.createInventoryUseCase = createInventoryUseCase;
        this.updateInventoryUseCase = updateInventoryUseCase;
        this.deleteInventoryUseCase = deleteInventoryUseCase;
        this.getInventoryUseCase = getInventoryUseCase;
        this.listInventoryUseCase = listInventoryUseCase;
    }
    create(dto) {
        return this.createInventoryUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listInventoryUseCase.execute(filter);
    }
    findOne(id) {
        return this.getInventoryUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateInventoryUseCase.execute(id, dto);
    }
    remove(id) {
        return this.deleteInventoryUseCase.execute(id);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Crear inventario' }),
    ApiCreatedResponse({ type: InventoryResponseDto }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Listar inventario' }),
    ApiOkResponse({ type: [InventoryResponseDto] }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InventoryFilterDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Obtener inventario por ID' }),
    ApiOkResponse({ type: InventoryResponseDto }),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    ApiOperation({ summary: 'Actualizar inventario' }),
    ApiOkResponse({ type: InventoryResponseDto }),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Eliminar inventario' }),
    ApiNoContentResponse(),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "remove", null);
InventoryController = __decorate([
    ApiTags('Inventory'),
    Controller('api/inventory'),
    __metadata("design:paramtypes", [CreateInventoryUseCase,
        UpdateInventoryUseCase,
        DeleteInventoryUseCase,
        GetInventoryUseCase,
        ListInventoryUseCase])
], InventoryController);
export { InventoryController };
//# sourceMappingURL=inventory.controller.js.map