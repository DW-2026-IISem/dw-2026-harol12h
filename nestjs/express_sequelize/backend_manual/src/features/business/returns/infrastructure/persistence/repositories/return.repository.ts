import { Injectable } from '@nestjs/common';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util.js';
import { Return } from '../../../domain/entities/return.entity.js';
import type { IReturnRepository, ReturnFindAllParams } from '../../../domain/interfaces/return-repository.interface.js';
import { ReturnMapper } from '../../../application/mappers/return.mapper.js';
import { ReturnModel } from '../models/return.model.js';

@Injectable()
export class ReturnRepository implements IReturnRepository {
  async create(returnEntity: Return): Promise<Return> {
    const model = await ReturnModel.create(ReturnMapper.toPersistence(returnEntity));
    return ReturnMapper.toDomain(model);
  }

  async update(returnEntity: Return): Promise<Return> {
    await ReturnModel.update(ReturnMapper.toPersistence(returnEntity), { where: { id: returnEntity.id } });
    const updated = await ReturnModel.findByPk(returnEntity.id!);
    return ReturnMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await ReturnModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Return | null> {
    const model = await ReturnModel.findByPk(id);
    return model ? ReturnMapper.toDomain(model) : null;
  }

  async findAll(params: ReturnFindAllParams) {
    const { page, limit, offset } = normalizePagination(params.page, params.limit);
    const where: any = {};
    if (params.orderId) where.orderId = params.orderId;
    if (params.status) where.status = params.status;

    const { rows, count } = await ReturnModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row: ReturnModel) => ReturnMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
