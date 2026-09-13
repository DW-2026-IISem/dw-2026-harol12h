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
import { CreateCollectionDto } from '../../../application/dto/create-collection.dto.js';
import { UpdateCollectionDto } from '../../../application/dto/update-collection.dto.js';
import { CollectionFilterDto } from '../../../application/dto/collection-filter.dto.js';
import { CollectionResponseDto } from '../../../application/dto/collection-response.dto.js';
import { CreateCollectionUseCase } from '../../../application/use-cases/create-collection.use-case.js';
import { UpdateCollectionUseCase } from '../../../application/use-cases/update-collection.use-case.js';
import { DeleteCollectionUseCase } from '../../../application/use-cases/delete-collection.use-case.js';
import { GetCollectionUseCase } from '../../../application/use-cases/get-collection.use-case.js';
import { ListCollectionsUseCase } from '../../../application/use-cases/list-collections.use-case.js';
let CollectionsController = class CollectionsController {
    createCollectionUseCase;
    updateCollectionUseCase;
    deleteCollectionUseCase;
    getCollectionUseCase;
    listCollectionsUseCase;
    constructor(createCollectionUseCase, updateCollectionUseCase, deleteCollectionUseCase, getCollectionUseCase, listCollectionsUseCase) {
        this.createCollectionUseCase = createCollectionUseCase;
        this.updateCollectionUseCase = updateCollectionUseCase;
        this.deleteCollectionUseCase = deleteCollectionUseCase;
        this.getCollectionUseCase = getCollectionUseCase;
        this.listCollectionsUseCase = listCollectionsUseCase;
    }
    create(dto) {
        return this.createCollectionUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listCollectionsUseCase.execute(filter);
    }
    findOne(id) {
        return this.getCollectionUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateCollectionUseCase.execute(id, dto);
    }
    remove(id) {
        return this.deleteCollectionUseCase.execute(id);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Crear una colección' }),
    ApiCreatedResponse({ type: CollectionResponseDto }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCollectionDto]),
    __metadata("design:returntype", void 0)
], CollectionsController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Listar colecciones' }),
    ApiOkResponse({ type: [CollectionResponseDto] }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CollectionFilterDto]),
    __metadata("design:returntype", void 0)
], CollectionsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Obtener una colección por ID' }),
    ApiOkResponse({ type: CollectionResponseDto }),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CollectionsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    ApiOperation({ summary: 'Actualizar una colección' }),
    ApiOkResponse({ type: CollectionResponseDto }),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateCollectionDto]),
    __metadata("design:returntype", void 0)
], CollectionsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Eliminar una colección' }),
    ApiNoContentResponse(),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CollectionsController.prototype, "remove", null);
CollectionsController = __decorate([
    ApiTags('Collections'),
    Controller('collections'),
    __metadata("design:paramtypes", [CreateCollectionUseCase,
        UpdateCollectionUseCase,
        DeleteCollectionUseCase,
        GetCollectionUseCase,
        ListCollectionsUseCase])
], CollectionsController);
export { CollectionsController };
//# sourceMappingURL=collections.controller.js.map