import { Inject, Injectable } from '@nestjs/common';
import type { IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface.js';
import { INVENTORY_REPOSITORY } from '../../domain/interfaces/inventory-repository.interface.js';
import { InventoryFilterDto } from '../dto/inventory-filter.dto.js';
import { InventoryMapper } from '../mappers/inventory.mapper.js';
import { Inventory } from '../../domain/entities/inventory.entity.js';

@Injectable()
export class ListInventoryUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: IInventoryRepository,
  ) {}

  async execute(filter: InventoryFilterDto) {
    const result = await this.inventoryRepository.findAll(filter);
    return {
      items: result.items.map((i: Inventory) => InventoryMapper.toResponse(i)),
      meta: result.meta,
    };
  }
}
