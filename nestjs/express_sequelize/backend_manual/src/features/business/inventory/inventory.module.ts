import { Module } from '@nestjs/common';
import { INVENTORY_REPOSITORY } from './domain/interfaces/inventory-repository.interface.js';
import { InventoryRepository } from './infrastructure/persistence/repositories/inventory.repository.js';
import { CreateInventoryUseCase } from './application/use-cases/create-inventory.use-case.js';
import { UpdateInventoryUseCase } from './application/use-cases/update-inventory.use-case.js';
import { DeleteInventoryUseCase } from './application/use-cases/delete-inventory.use-case.js';
import { GetInventoryUseCase } from './application/use-cases/get-inventory.use-case.js';
import { ListInventoryUseCase } from './application/use-cases/list-inventory.use-case.js';
import { InventoryController } from './presentation/http/controllers/inventory.controller.js';

@Module({
  controllers: [InventoryController],
  providers: [
    InventoryRepository,
    { provide: INVENTORY_REPOSITORY, useExisting: InventoryRepository },
    CreateInventoryUseCase,
    UpdateInventoryUseCase,
    DeleteInventoryUseCase,
    GetInventoryUseCase,
    ListInventoryUseCase,
  ],
  exports: [INVENTORY_REPOSITORY],
})
export class InventoryModule {}
