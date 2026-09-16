import type { IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface.js';
export declare class DeleteInventoryUseCase {
    private readonly inventoryRepository;
    constructor(inventoryRepository: IInventoryRepository);
    execute(id: number): Promise<void>;
}
