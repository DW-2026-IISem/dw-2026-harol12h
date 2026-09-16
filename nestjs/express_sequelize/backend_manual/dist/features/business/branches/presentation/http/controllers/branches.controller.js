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
import { CreateBranchDto } from '../../../application/dto/create-branch.dto.js';
import { UpdateBranchDto } from '../../../application/dto/update-branch.dto.js';
import { BranchFilterDto } from '../../../application/dto/branch-filter.dto.js';
import { BranchResponseDto } from '../../../application/dto/branch-response.dto.js';
import { CreateBranchUseCase } from '../../../application/use-cases/create-branch.use-case.js';
import { UpdateBranchUseCase } from '../../../application/use-cases/update-branch.use-case.js';
import { DeleteBranchUseCase } from '../../../application/use-cases/delete-branch.use-case.js';
import { GetBranchUseCase } from '../../../application/use-cases/get-branch.use-case.js';
import { ListBranchesUseCase } from '../../../application/use-cases/list-branches.use-case.js';
let BranchesController = class BranchesController {
    createBranchUseCase;
    updateBranchUseCase;
    deleteBranchUseCase;
    getBranchUseCase;
    listBranchesUseCase;
    constructor(createBranchUseCase, updateBranchUseCase, deleteBranchUseCase, getBranchUseCase, listBranchesUseCase) {
        this.createBranchUseCase = createBranchUseCase;
        this.updateBranchUseCase = updateBranchUseCase;
        this.deleteBranchUseCase = deleteBranchUseCase;
        this.getBranchUseCase = getBranchUseCase;
        this.listBranchesUseCase = listBranchesUseCase;
    }
    create(dto) {
        return this.createBranchUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listBranchesUseCase.execute(filter);
    }
    findOne(id) {
        return this.getBranchUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateBranchUseCase.execute(id, dto);
    }
    remove(id) {
        return this.deleteBranchUseCase.execute(id);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Crear una sucursal' }),
    ApiCreatedResponse({ type: BranchResponseDto }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBranchDto]),
    __metadata("design:returntype", void 0)
], BranchesController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Listar sucursales' }),
    ApiOkResponse({ type: [BranchResponseDto] }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BranchFilterDto]),
    __metadata("design:returntype", void 0)
], BranchesController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Obtener una sucursal por ID' }),
    ApiOkResponse({ type: BranchResponseDto }),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BranchesController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    ApiOperation({ summary: 'Actualizar una sucursal' }),
    ApiOkResponse({ type: BranchResponseDto }),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateBranchDto]),
    __metadata("design:returntype", void 0)
], BranchesController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Eliminar una sucursal' }),
    ApiNoContentResponse(),
    __param(0, Param('id', ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BranchesController.prototype, "remove", null);
BranchesController = __decorate([
    ApiTags('Branches'),
    Controller('api/branches'),
    __metadata("design:paramtypes", [CreateBranchUseCase,
        UpdateBranchUseCase,
        DeleteBranchUseCase,
        GetBranchUseCase,
        ListBranchesUseCase])
], BranchesController);
export { BranchesController };
//# sourceMappingURL=branches.controller.js.map