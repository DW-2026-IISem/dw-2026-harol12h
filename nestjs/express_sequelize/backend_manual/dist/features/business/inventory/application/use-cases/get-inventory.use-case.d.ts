import type { IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface.js';
export declare class GetInventoryUseCase {
    private readonly inventoryRepository;
    constructor(inventoryRepository: IInventoryRepository);
    execute(id: number): Promise<import("../dto/inventory-response.dto.js").InventoryResponseDto>;
}
