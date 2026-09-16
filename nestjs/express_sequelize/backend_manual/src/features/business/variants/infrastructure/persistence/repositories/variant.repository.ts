import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util.js';
import { Variant } from '../../../domain/entities/variant.entity.js';
import type { IVariantRepository, VariantFindAllParams } from '../../../domain/interfaces/variant-repository.interface.js';
import { VariantMapper } from '../../../application/mappers/variant.mapper.js';
import { VariantModel } from '../models/variant.model.js';

@Injectable()
export class VariantRepository implements IVariantRepository {
  async create(variant: Variant): Promise<Variant> {
    const model = await VariantModel.create(VariantMapper.toPersistence(variant));
    return VariantMapper.toDomain(model);
  }

  async update(variant: Variant): Promise<Variant> {
    await VariantModel.update(VariantMapper.toPersistence(variant), { where: { id: variant.id } });
    const updated = await VariantModel.findByPk(variant.id!);
    return VariantMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await VariantModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Variant | null> {
    const model = await VariantModel.findByPk(id);
    return model ? VariantMapper.toDomain(model) : null;
  }

  async findAll(params: VariantFindAllParams) {
    const { page, limit, offset } = normalizePagination(params.page, params.limit);

    const where: any = {};
    if (params.productId) where.productId = params.productId;
    if (params.search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${params.search}%` } },
        { description: { [Op.like]: `%${params.search}%` } },
      ];
    }

    const { rows, count } = await VariantModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row: VariantModel) => VariantMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
