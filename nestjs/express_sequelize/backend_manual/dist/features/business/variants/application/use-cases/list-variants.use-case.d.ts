import type { IVariantRepository } from '../../domain/interfaces/variant-repository.interface.js';
import { VariantFilterDto } from '../dto/variant-filter.dto.js';
export declare class ListVariantsUseCase {
    private readonly variantRepository;
    constructor(variantRepository: IVariantRepository);
    execute(filter: VariantFilterDto): Promise<{
        items: import("../dto/variant-response.dto.js").VariantResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
}
