import { Injectable } from '@nestjs/common';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util.js';
import { ReturnDetail } from '../../../domain/entities/return-detail.entity.js';
import type { IReturnDetailRepository, ReturnDetailFindAllParams } from '../../../domain/interfaces/return-detail-repository.interface.js';
import { ReturnDetailMapper } from '../../../application/mappers/return-detail.mapper.js';
import { ReturnDetailModel } from '../models/return-detail.model.js';

@Injectable()
export class ReturnDetailRepository implements IReturnDetailRepository {
  async create(detail: ReturnDetail): Promise<ReturnDetail> {
    const model = await ReturnDetailModel.create(ReturnDetailMapper.toPersistence(detail));
    return ReturnDetailMapper.toDomain(model);
  }

  async update(detail: ReturnDetail): Promise<ReturnDetail> {
    await ReturnDetailModel.update(ReturnDetailMapper.toPersistence(detail), { where: { id: detail.id } });
    const updated = await ReturnDetailModel.findByPk(detail.id!);
    return ReturnDetailMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await ReturnDetailModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<ReturnDetail | null> {
    const model = await ReturnDetailModel.findByPk(id);
    return model ? ReturnDetailMapper.toDomain(model) : null;
  }

  async findAll(params: ReturnDetailFindAllParams) {
    const { page, limit, offset } = normalizePagination(params.page, params.limit);
    const where: any = {};
    if (params.returnId) where.returnId = params.returnId;
    if (params.productId) where.productId = params.productId;

    const { rows, count } = await ReturnDetailModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row: ReturnDetailModel) => ReturnDetailMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
