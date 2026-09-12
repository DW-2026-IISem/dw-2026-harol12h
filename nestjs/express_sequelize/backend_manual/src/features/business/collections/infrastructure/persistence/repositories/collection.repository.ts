import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { Collection } from '../../../domain/entities/collection.entity';
import {
  ICollectionRepository,
  CollectionFindAllParams,
} from '../../../domain/interfaces/collection-repository.interface';
import { CollectionMapper } from '../../../application/mappers/collection.mapper';
import { CollectionModel } from '../models/collection.model';

@Injectable()
export class CollectionRepository implements ICollectionRepository {
  async create(collection: Collection): Promise<Collection> {
    const model = await CollectionModel.create(
      CollectionMapper.toPersistence(collection),
    );
    return CollectionMapper.toDomain(model);
  }

  async update(collection: Collection): Promise<Collection> {
    await CollectionModel.update(
      CollectionMapper.toPersistence(collection),
      { where: { id: collection.id } },
    );

    const updated = await CollectionModel.findByPk(collection.id!);

    return CollectionMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await CollectionModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Collection | null> {
    const model = await CollectionModel.findByPk(id);

    return model ? CollectionMapper.toDomain(model) : null;
  }

  async findAll(params: CollectionFindAllParams) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where = params.search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${params.search}%` } },
            { description: { [Op.like]: `%${params.search}%` } },
          ],
        }
      : {};

    const { rows, count } = await CollectionModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => CollectionMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
