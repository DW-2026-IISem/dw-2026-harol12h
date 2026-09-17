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
import { CreatePromotionUseCase } from '../../../application/use-cases/create-promotion.usecase.js';
import { UpdatePromotionUseCase } from '../../../application/use-cases/update-promotion.usecase.js';
import { DeletePromotionUseCase } from '../../../application/use-cases/delete-promotion.usecase.js';
import { FindPromotionUseCase } from '../../../application/use-cases/find-promotion.usecase.js';
import { ListPromotionsUseCase } from '../../../application/use-cases/list-promotions.usecase.js';
import { CreatePromotionDto } from '../../../application/dto/create-promotion.dto.js';
import { UpdatePromotionDto } from '../../../application/dto/update-promotion.dto.js';
let PromotionsController = class PromotionsController {
    createPromotion;
    updatePromotion;
    deletePromotion;
    findPromotion;
    listPromotions;
    constructor(createPromotion, updatePromotion, deletePromotion, findPromotion, listPromotions) {
        this.createPromotion = createPromotion;
        this.updatePromotion = updatePromotion;
        this.deletePromotion = deletePromotion;
        this.findPromotion = findPromotion;
        this.listPromotions = listPromotions;
    }
    async create(dto) {
        return this.createPromotion.execute(dto);
    }
    async list() {
        return this.listPromotions.execute({});
    }
    async find(id) {
        return this.findPromotion.execute(id);
    }
    async update(id, dto) {
        const promotion = { id, ...dto };
        return this.updatePromotion.execute(promotion);
    }
    async delete(id) {
        return this.deletePromotion.execute(id);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePromotionDto]),
    __metadata("design:returntype", Promise)
], PromotionsController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromotionsController.prototype, "list", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PromotionsController.prototype, "find", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdatePromotionDto]),
    __metadata("design:returntype", Promise)
], PromotionsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PromotionsController.prototype, "delete", null);
PromotionsController = __decorate([
    Controller('promotions'),
    __metadata("design:paramtypes", [CreatePromotionUseCase,
        UpdatePromotionUseCase,
        DeletePromotionUseCase,
        FindPromotionUseCase,
        ListPromotionsUseCase])
], PromotionsController);
export { PromotionsController };
//# sourceMappingURL=promotions.controller.js.map