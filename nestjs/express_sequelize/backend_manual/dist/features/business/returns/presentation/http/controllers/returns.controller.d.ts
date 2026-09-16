import { CreateReturnUseCase } from '../../../application/use-cases/create-return.usecase.js';
import { UpdateReturnUseCase } from '../../../application/use-cases/update-return.usecase.js';
import { DeleteReturnUseCase } from '../../../application/use-cases/delete-return.usecase.js';
import { FindReturnUseCase } from '../../../application/use-cases/find-return.usecase.js';
import { ListReturnsUseCase } from '../../../application/use-cases/list-returns.usecase.js';
import { CreateReturnDto } from '../../../application/dto/create-return.dto.js';
import { UpdateReturnDto } from '../../../application/dto/update-return.dto.js';
export declare class ReturnsController {
    private readonly createReturn;
    private readonly updateReturn;
    private readonly deleteReturn;
    private readonly findReturn;
    private readonly listReturns;
    constructor(createReturn: CreateReturnUseCase, updateReturn: UpdateReturnUseCase, deleteReturn: DeleteReturnUseCase, findReturn: FindReturnUseCase, listReturns: ListReturnsUseCase);
    create(dto: CreateReturnDto): Promise<import("../../../domain/entities/return.entity.js").Return>;
    list(): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<import("../../../domain/entities/return.entity.js").Return>>;
    find(id: number): Promise<import("../../../domain/entities/return.entity.js").Return | null>;
    update(id: number, dto: UpdateReturnDto): Promise<import("../../../domain/entities/return.entity.js").Return>;
    delete(id: number): Promise<void>;
}
