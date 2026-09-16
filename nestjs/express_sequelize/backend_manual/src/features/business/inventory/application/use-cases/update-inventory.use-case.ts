import { Inject, Injectable } from '@nestjs/common';
import { InventoryNotFoundException } from '../../domain/exceptions/inventory-not-found.exception.js';
import type { IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface.js';
import { INVENTORY_REPOSITORY } from '../../domain/interfaces/inventory-repository.interface.js';
import { UpdateInventoryDto } from '../dto/update-inventory.dto.js';
import { InventoryMapper } from '../mappers/inventory.mapper.js';

@Injectable()
export class UpdateInventoryUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: IInventoryRepository,
  ) {}

  async execute(id: number, dto: UpdateInventoryDto) {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) throw new InventoryNotFoundException(id);

    inventory.updateQuantity(dto.quantity ?? inventory.quantity);
    const updated = await this.inventoryRepository.update(inventory);
    return InventoryMapper.toResponse(updated);
  }
}
