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
import { CreateVariantDto } from '../../../application/dto/create-variant.dto.js';
import { UpdateVariantDto } from '../../../application/dto/update-variant.dto.js';
import { VariantFilterDto } from '../../../application/dto/variant-filter.dto.js';
import { VariantResponseDto } from '../../../application/dto/variant-response.dto.js';
import { CreateVariantUseCase } from '../../../application/use-cases/create-variant.use-case.js';
import { UpdateVariantUseCase } from '../../../application/use-cases/update-variant.use-case.js';
import { DeleteVariantUseCase } from '../../../application/use-cases/delete-variant.use-case.js';
import { GetVariantUseCase } from '../../../application/use-cases/get-variant.use-case.js';
import { ListVariantsUseCase } from '../../../application/use-cases/list-variants.use-case.js';
let VariantsController = class VariantsController {
    createVariantUseCase;
    updateVariantUseCase;
    deleteVariantUseCase;
    getVariantUseCase;
    listVariantsUseCase;
    constructor(createVariantUseCase, updateVariantUseCase, deleteVariantUseCase, getVariantUseCase, listVariantsUseCase) {
        this.createVariantUseCase = createVariantUseCase;
        this.updateVariantUseCase = updateVariantUseCase;
        this.deleteVariantUseCase = deleteVariantUseCase;
        this.getVariantUseCase = getVariantUseCase;
        this.listVariantsUseCase = listVariantsUseCase;
    }
    create(dto) {
        return this.createVariantUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listVariantsUseCase.execute(filter);
    }
    findOne(id) {
        return this.getVariantUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateVariantUseCase.execute(id, dto);
    }
    remove(id) {
        return this.deleteVariantUseCase.execute(id);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Crear una variante' }),
    ApiCreatedResponse({ type: VariantResponseDto }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateVariantDto]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Listar variantes' }),
    ApiOkResponse({ type: [VariantResponseDto] }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VariantFilterDto]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Obtener una variante por ID' }),
    ApiOkResponse({ type: VariantResponseDto }),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    ApiOperation({ summary: 'Actualizar una variante' }),
    ApiOkResponse({ type: VariantResponseDto }),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateVariantDto]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Eliminar una variante' }),
    ApiNoContentResponse(),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "remove", null);
VariantsController = __decorate([
    ApiTags('Variants'),
    Controller('variants'),
    __metadata("design:paramtypes", [CreateVariantUseCase,
        UpdateVariantUseCase,
        DeleteVariantUseCase,
        GetVariantUseCase,
        ListVariantsUseCase])
], VariantsController);
export { VariantsController };
//# sourceMappingURL=variants.controller.js.map