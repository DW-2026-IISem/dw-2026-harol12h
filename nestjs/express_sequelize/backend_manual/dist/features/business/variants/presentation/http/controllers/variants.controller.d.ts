import { CreateVariantDto } from '../../../application/dto/create-variant.dto.js';
import { UpdateVariantDto } from '../../../application/dto/update-variant.dto.js';
import { VariantFilterDto } from '../../../application/dto/variant-filter.dto.js';
import { VariantResponseDto } from '../../../application/dto/variant-response.dto.js';
import { CreateVariantUseCase } from '../../../application/use-cases/create-variant.use-case.js';
import { UpdateVariantUseCase } from '../../../application/use-cases/update-variant.use-case.js';
import { DeleteVariantUseCase } from '../../../application/use-cases/delete-variant.use-case.js';
import { GetVariantUseCase } from '../../../application/use-cases/get-variant.use-case.js';
import { ListVariantsUseCase } from '../../../application/use-cases/list-variants.use-case.js';
export declare class VariantsController {
    private readonly createVariantUseCase;
    private readonly updateVariantUseCase;
    private readonly deleteVariantUseCase;
    private readonly getVariantUseCase;
    private readonly listVariantsUseCase;
    constructor(createVariantUseCase: CreateVariantUseCase, updateVariantUseCase: UpdateVariantUseCase, deleteVariantUseCase: DeleteVariantUseCase, getVariantUseCase: GetVariantUseCase, listVariantsUseCase: ListVariantsUseCase);
    create(dto: CreateVariantDto): Promise<VariantResponseDto>;
    findAll(filter: VariantFilterDto): Promise<{
        items: VariantResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
    findOne(id: number): Promise<VariantResponseDto>;
    update(id: number, dto: UpdateVariantDto): Promise<VariantResponseDto>;
    remove(id: number): Promise<void>;
}
