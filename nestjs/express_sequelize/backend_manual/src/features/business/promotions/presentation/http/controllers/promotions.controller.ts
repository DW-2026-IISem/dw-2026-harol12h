import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { CreatePromotionUseCase } from '../../../application/use-cases/create-promotion.usecase.js';
import { UpdatePromotionUseCase } from '../../../application/use-cases/update-promotion.usecase.js';
import { DeletePromotionUseCase } from '../../../application/use-cases/delete-promotion.usecase.js';
import { FindPromotionUseCase } from '../../../application/use-cases/find-promotion.usecase.js';
import { ListPromotionsUseCase } from '../../../application/use-cases/list-promotions.usecase.js';
import { CreatePromotionDto } from '../../../application/dto/create-promotion.dto.js';
import { UpdatePromotionDto } from '../../../application/dto/update-promotion.dto.js';

@Controller('promotions')
export class PromotionsController {
  constructor(
    private readonly createPromotion: CreatePromotionUseCase,
    private readonly updatePromotion: UpdatePromotionUseCase,
    private readonly deletePromotion: DeletePromotionUseCase,
    private readonly findPromotion: FindPromotionUseCase,
    private readonly listPromotions: ListPromotionsUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreatePromotionDto) {
    return this.createPromotion.execute(dto);
  }

  @Get()
  async list() {
    return this.listPromotions.execute({});
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    return this.findPromotion.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdatePromotionDto) {
    const promotion = { id, ...dto } as any;
    return this.updatePromotion.execute(promotion);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.deletePromotion.execute(id);
  }
}
