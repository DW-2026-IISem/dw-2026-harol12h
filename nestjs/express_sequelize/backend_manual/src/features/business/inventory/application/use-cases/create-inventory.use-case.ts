import { Inject, Injectable } from '@nestjs/common';
import { Inventory } from '../../domain/entities/inventory.entity.js';
import type { IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface.js';
import { INVENTORY_REPOSITORY } from '../../domain/interfaces/inventory-repository.interface.js';
import { CreateInventoryDto } from '../dto/create-inventory.dto.js';
import { InventoryMapper } from '../mappers/inventory.mapper.js';

@Injectable()
export class CreateInventoryUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: IInventoryRepository,
  ) {}

  async execute(dto: CreateInventoryDto) {
    const inventory = Inventory.create(dto);
    const created = await this.inventoryRepository.create(inventory);
    return InventoryMapper.toResponse(created);
  }
}
