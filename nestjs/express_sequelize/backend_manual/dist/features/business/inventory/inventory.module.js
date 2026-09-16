var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { INVENTORY_REPOSITORY } from './domain/interfaces/inventory-repository.interface.js';
import { InventoryRepository } from './infrastructure/persistence/repositories/inventory.repository.js';
import { CreateInventoryUseCase } from './application/use-cases/create-inventory.use-case.js';
import { UpdateInventoryUseCase } from './application/use-cases/update-inventory.use-case.js';
import { DeleteInventoryUseCase } from './application/use-cases/delete-inventory.use-case.js';
import { GetInventoryUseCase } from './application/use-cases/get-inventory.use-case.js';
import { ListInventoryUseCase } from './application/use-cases/list-inventory.use-case.js';
import { InventoryController } from './presentation/http/controllers/inventory.controller.js';
let InventoryModule = class InventoryModule {
};
InventoryModule = __decorate([
    Module({
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
], InventoryModule);
export { InventoryModule };
//# sourceMappingURL=inventory.module.js.map