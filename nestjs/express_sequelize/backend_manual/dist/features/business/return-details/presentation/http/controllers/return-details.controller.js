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
import { CreateReturnDetailUseCase } from '../../../application/use-cases/create-return-detail.usecase.js';
import { UpdateReturnDetailUseCase } from '../../../application/use-cases/update-return-detail.usecase.js';
import { DeleteReturnDetailUseCase } from '../../../application/use-cases/delete-return-detail.usecase.js';
import { FindReturnDetailUseCase } from '../../../application/use-cases/find-return-detail.use-case.js';
import { ListReturnDetailsUseCase } from '../../../application/use-cases/list-return-details.usecase.js';
import { CreateReturnDetailDto } from '../../../application/dto/create-return-detail.dto.js';
import { UpdateReturnDetailDto } from '../../../application/dto/update-return-detail.dto.js';
let ReturnDetailsController = class ReturnDetailsController {
    createDetail;
    updateDetail;
    deleteDetail;
    findDetail;
    listDetails;
    constructor(createDetail, updateDetail, deleteDetail, findDetail, listDetails) {
        this.createDetail = createDetail;
        this.updateDetail = updateDetail;
        this.deleteDetail = deleteDetail;
        this.findDetail = findDetail;
        this.listDetails = listDetails;
    }
    async create(dto) {
        return this.createDetail.execute(dto);
    }
    async list() {
        return this.listDetails.execute({});
    }
    async find(id) {
        return this.findDetail.execute(id);
    }
    async update(id, dto) {
        const detail = { id, ...dto };
        return this.updateDetail.execute(detail);
    }
    async delete(id) {
        return this.deleteDetail.execute(id);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReturnDetailDto]),
    __metadata("design:returntype", Promise)
], ReturnDetailsController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReturnDetailsController.prototype, "list", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReturnDetailsController.prototype, "find", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateReturnDetailDto]),
    __metadata("design:returntype", Promise)
], ReturnDetailsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReturnDetailsController.prototype, "delete", null);
ReturnDetailsController = __decorate([
    Controller('return-details'),
    __metadata("design:paramtypes", [CreateReturnDetailUseCase,
        UpdateReturnDetailUseCase,
        DeleteReturnDetailUseCase,
        FindReturnDetailUseCase,
        ListReturnDetailsUseCase])
], ReturnDetailsController);
export { ReturnDetailsController };
//# sourceMappingURL=return-details.controller.js.map