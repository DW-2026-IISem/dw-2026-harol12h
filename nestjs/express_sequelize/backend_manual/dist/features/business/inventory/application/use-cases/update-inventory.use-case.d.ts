import type { IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface.js';
import { UpdateInventoryDto } from '../dto/update-inventory.dto.js';
export declare class UpdateInventoryUseCase {
    private readonly inventoryRepository;
    constructor(inventoryRepository: IInventoryRepository);
    execute(id: number, dto: UpdateInventoryDto): Promise<import("../dto/inventory-response.dto.js").InventoryResponseDto>;
}
