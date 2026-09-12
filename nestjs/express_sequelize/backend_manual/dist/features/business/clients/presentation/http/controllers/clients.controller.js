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
import { CreateClientDto } from '../../../application/dto/create-client.dto.js';
import { UpdateClientDto } from '../../../application/dto/update-client.dto.js';
import { ClientFilterDto } from '../../../application/dto/client-filter.dto.js';
import { ClientResponseDto } from '../../../application/dto/client-response.dto.js';
import { CreateClientUseCase } from '../../../application/use-cases/create-client.use-case.js';
import { UpdateClientUseCase } from '../../../application/use-cases/update-client.use-case.js';
import { DeleteClientUseCase } from '../../../application/use-cases/delete-client.use-case.js';
import { GetClientUseCase } from '../../../application/use-cases/get-client.use-case.js';
import { ListClientsUseCase } from '../../../application/use-cases/list-clients.use-case.js';
let ClientsController = class ClientsController {
    createClientUseCase;
    updateClientUseCase;
    deleteClientUseCase;
    getClientUseCase;
    listClientsUseCase;
    constructor(createClientUseCase, updateClientUseCase, deleteClientUseCase, getClientUseCase, listClientsUseCase) {
        this.createClientUseCase = createClientUseCase;
        this.updateClientUseCase = updateClientUseCase;
        this.deleteClientUseCase = deleteClientUseCase;
        this.getClientUseCase = getClientUseCase;
        this.listClientsUseCase = listClientsUseCase;
    }
    create(dto) {
        return this.createClientUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listClientsUseCase.execute(filter);
    }
    findOne(id) {
        return this.getClientUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateClientUseCase.execute(id, dto);
    }
    remove(id) {
        return this.deleteClientUseCase.execute(id);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Crear un cliente' }),
    ApiCreatedResponse({ type: ClientResponseDto }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateClientDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Listar clientes' }),
    ApiOkResponse({ type: [ClientResponseDto] }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClientFilterDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Obtener un cliente por ID' }),
    ApiOkResponse({ type: ClientResponseDto }),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    ApiOperation({ summary: 'Actualizar un cliente' }),
    ApiOkResponse({ type: ClientResponseDto }),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateClientDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Eliminar un cliente' }),
    ApiNoContentResponse(),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "remove", null);
ClientsController = __decorate([
    ApiTags('Clients'),
    Controller('clients'),
    __metadata("design:paramtypes", [CreateClientUseCase,
        UpdateClientUseCase,
        DeleteClientUseCase,
        GetClientUseCase,
        ListClientsUseCase])
], ClientsController);
export { ClientsController };
//# sourceMappingURL=clients.controller.js.map