import { Injectable } from '@nestjs/common';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util.js';
import { Promotion } from '../../../domain/entities/promotion.entity.js';
import type { IPromotionRepository, PromotionFindAllParams } from '../../../domain/interfaces/promotion-repository.interface.js';
import { PromotionMapper } from '../../../application/mappers/promotion.mapper.js';
import { PromotionModel } from '../models/promotion.model.js';

@Injectable()
export class PromotionRepository implements IPromotionRepository {
  async create(promotion: Promotion): Promise<Promotion> {
    const model = await PromotionModel.create(PromotionMapper.toPersistence(promotion));
    return PromotionMapper.toDomain(model);
  }

  async update(promotion: Promotion): Promise<Promotion> {
    await PromotionModel.update(PromotionMapper.toPersistence(promotion), { where: { id: promotion.id } });
    const updated = await PromotionModel.findByPk(promotion.id!);
    return PromotionMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await PromotionModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Promotion | null> {
    const model = await PromotionModel.findByPk(id);
    return model ? PromotionMapper.toDomain(model) : null;
  }

  async findAll(params: PromotionFindAllParams) {
    const { page, limit, offset } = normalizePagination(params.page, params.limit);
    const where: any = {};
    if (params.active !== undefined) where.active = params.active;

    const { rows, count } = await PromotionModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row: PromotionModel) => PromotionMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
