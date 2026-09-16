import type { IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface.js';
import { CreateInventoryDto } from '../dto/create-inventory.dto.js';
export declare class CreateInventoryUseCase {
    private readonly inventoryRepository;
    constructor(inventoryRepository: IInventoryRepository);
    execute(dto: CreateInventoryDto): Promise<import("../dto/inventory-response.dto.js").InventoryResponseDto>;
}
