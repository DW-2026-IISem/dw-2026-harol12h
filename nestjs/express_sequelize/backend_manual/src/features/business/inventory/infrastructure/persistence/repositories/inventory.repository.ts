import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util.js';
import { Inventory } from '../../../domain/entities/inventory.entity.js';
import type { IInventoryRepository, InventoryFindAllParams } from '../../../domain/interfaces/inventory-repository.interface.js';
import { InventoryMapper } from '../../../application/mappers/inventory.mapper.js';
import { InventoryModel } from '../models/inventory.model.js';

@Injectable()
export class InventoryRepository implements IInventoryRepository {
  async create(inventory: Inventory): Promise<Inventory> {
    const model = await InventoryModel.create(InventoryMapper.toPersistence(inventory));
    return InventoryMapper.toDomain(model);
  }

  async update(inventory: Inventory): Promise<Inventory> {
    await InventoryModel.update(InventoryMapper.toPersistence(inventory), { where: { id: inventory.id } });
    const updated = await InventoryModel.findByPk(inventory.id!);
    return InventoryMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await InventoryModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Inventory | null> {
    const model = await InventoryModel.findByPk(id);
    return model ? InventoryMapper.toDomain(model) : null;
  }

  async findAll(params: InventoryFindAllParams) {
    const { page, limit, offset } = normalizePagination(params.page, params.limit);
    const where: any = {};
    if (params.branchId) where.branchId = params.branchId;
    if (params.variantId) where.variantId = params.variantId;

    const { rows, count } = await InventoryModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row: InventoryModel) => InventoryMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
