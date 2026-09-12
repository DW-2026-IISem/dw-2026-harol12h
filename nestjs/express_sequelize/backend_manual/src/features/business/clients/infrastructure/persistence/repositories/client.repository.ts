import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util.js';
import { Client } from '../../../domain/entities/client.entity.js';
import { IClientRepository, PaginatedResult } 
  from '../../../domain/interfaces/client-repository.interface.js';

import { ClientFilterDto } 
  from '../../../application/dto/client-filter.dto.js';

import { ClientMapper } from '../../../application/mappers/client.mapper.js';
import { ClientModel } from '../models/client.model.js';

@Injectable()
export class ClientRepository implements IClientRepository {
  async create(client: Client): Promise<Client> {
    const model = await ClientModel.create(ClientMapper.toPersistence(client));
    return ClientMapper.toDomain(model);
  }

  async update(id: number, data: any): Promise<any> {
    await ClientModel.update(data, {
      where: { id },
    });
    const updated = await ClientModel.findByPk(id);
    return updated ? ClientMapper.toDomain(updated) : null;
  }

  async delete(id: number): Promise<void> {
    await ClientModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Client | null> {
    const model = await ClientModel.findByPk(id);
    return model ? ClientMapper.toDomain(model) : null;
  }

  async findByEmail(email: string): Promise<Client | null> {
    const model = await ClientModel.findOne({ where: { email } });
    return model ? ClientMapper.toDomain(model) : null;
  }

  async findAll(params: ClientFilterDto): Promise<PaginatedResult<Client>> {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where = params.search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${params.search}%` } },
            { email: { [Op.like]: `%${params.search}%` } },
          ],
        }
      : {};

    const { rows, count } = await ClientModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => ClientMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
