var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { InventoryNotFoundException } from '../../domain/exceptions/inventory-not-found.exception.js';
import { INVENTORY_REPOSITORY } from '../../domain/interfaces/inventory-repository.interface.js';
let DeleteInventoryUseCase = class DeleteInventoryUseCase {
    inventoryRepository;
    constructor(inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    async execute(id) {
        const inventory = await this.inventoryRepository.findById(id);
        if (!inventory)
            throw new InventoryNotFoundException(id);
        await this.inventoryRepository.delete(id);
    }
};
DeleteInventoryUseCase = __decorate([
    Injectable(),
    __param(0, Inject(INVENTORY_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteInventoryUseCase);
export { DeleteInventoryUseCase };
//# sourceMappingURL=delete-inventory.use-case.js.map