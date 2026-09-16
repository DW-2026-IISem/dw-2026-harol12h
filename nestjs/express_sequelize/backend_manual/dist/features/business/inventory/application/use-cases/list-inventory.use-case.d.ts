import type { IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface.js';
import { InventoryFilterDto } from '../dto/inventory-filter.dto.js';
export declare class ListInventoryUseCase {
    private readonly inventoryRepository;
    constructor(inventoryRepository: IInventoryRepository);
    execute(filter: InventoryFilterDto): Promise<{
        items: import("../dto/inventory-response.dto.js").InventoryResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
}
