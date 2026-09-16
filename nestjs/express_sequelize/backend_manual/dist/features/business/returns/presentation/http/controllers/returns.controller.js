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
import { CreateReturnUseCase } from '../../../application/use-cases/create-return.usecase.js';
import { UpdateReturnUseCase } from '../../../application/use-cases/update-return.usecase.js';
import { DeleteReturnUseCase } from '../../../application/use-cases/delete-return.usecase.js';
import { FindReturnUseCase } from '../../../application/use-cases/find-return.usecase.js';
import { ListReturnsUseCase } from '../../../application/use-cases/list-returns.usecase.js';
import { CreateReturnDto } from '../../../application/dto/create-return.dto.js';
import { UpdateReturnDto } from '../../../application/dto/update-return.dto.js';
let ReturnsController = class ReturnsController {
    createReturn;
    updateReturn;
    deleteReturn;
    findReturn;
    listReturns;
    constructor(createReturn, updateReturn, deleteReturn, findReturn, listReturns) {
        this.createReturn = createReturn;
        this.updateReturn = updateReturn;
        this.deleteReturn = deleteReturn;
        this.findReturn = findReturn;
        this.listReturns = listReturns;
    }
    async create(dto) {
        return this.createReturn.execute(dto);
    }
    async list() {
        return this.listReturns.execute({});
    }
    async find(id) {
        return this.findReturn.execute(id);
    }
    async update(id, dto) {
        const returnEntity = { id, ...dto };
        return this.updateReturn.execute(returnEntity);
    }
    async delete(id) {
        return this.deleteReturn.execute(id);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReturnDto]),
    __metadata("design:returntype", Promise)
], ReturnsController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReturnsController.prototype, "list", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReturnsController.prototype, "find", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateReturnDto]),
    __metadata("design:returntype", Promise)
], ReturnsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReturnsController.prototype, "delete", null);
ReturnsController = __decorate([
    Controller('returns'),
    __metadata("design:paramtypes", [CreateReturnUseCase,
        UpdateReturnUseCase,
        DeleteReturnUseCase,
        FindReturnUseCase,
        ListReturnsUseCase])
], ReturnsController);
export { ReturnsController };
//# sourceMappingURL=returns.controller.js.map