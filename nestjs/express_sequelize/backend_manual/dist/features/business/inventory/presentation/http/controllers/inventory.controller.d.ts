import { CreateInventoryDto } from '../../../application/dto/create-inventory.dto.js';
import { UpdateInventoryDto } from '../../../application/dto/update-inventory.dto.js';
import { InventoryFilterDto } from '../../../application/dto/inventory-filter.dto.js';
import { InventoryResponseDto } from '../../../application/dto/inventory-response.dto.js';
import { CreateInventoryUseCase } from '../../../application/use-cases/create-inventory.use-case.js';
import { UpdateInventoryUseCase } from '../../../application/use-cases/update-inventory.use-case.js';
import { DeleteInventoryUseCase } from '../../../application/use-cases/delete-inventory.use-case.js';
import { GetInventoryUseCase } from '../../../application/use-cases/get-inventory.use-case.js';
import { ListInventoryUseCase } from '../../../application/use-cases/list-inventory.use-case.js';
export declare class InventoryController {
    private readonly createInventoryUseCase;
    private readonly updateInventoryUseCase;
    private readonly deleteInventoryUseCase;
    private readonly getInventoryUseCase;
    private readonly listInventoryUseCase;
    constructor(createInventoryUseCase: CreateInventoryUseCase, updateInventoryUseCase: UpdateInventoryUseCase, deleteInventoryUseCase: DeleteInventoryUseCase, getInventoryUseCase: GetInventoryUseCase, listInventoryUseCase: ListInventoryUseCase);
    create(dto: CreateInventoryDto): Promise<InventoryResponseDto>;
    findAll(filter: InventoryFilterDto): Promise<{
        items: InventoryResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
    findOne(id: number): Promise<InventoryResponseDto>;
    update(id: number, dto: UpdateInventoryDto): Promise<InventoryResponseDto>;
    remove(id: number): Promise<void>;
}
