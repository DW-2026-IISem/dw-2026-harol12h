import { CreateReturnDetailUseCase } from '../../../application/use-cases/create-return-detail.usecase.js';
import { UpdateReturnDetailUseCase } from '../../../application/use-cases/update-return-detail.usecase.js';
import { DeleteReturnDetailUseCase } from '../../../application/use-cases/delete-return-detail.usecase.js';
import { FindReturnDetailUseCase } from '../../../application/use-cases/find-return-detail.use-case.js';
import { ListReturnDetailsUseCase } from '../../../application/use-cases/list-return-details.usecase.js';
import { CreateReturnDetailDto } from '../../../application/dto/create-return-detail.dto.js';
import { UpdateReturnDetailDto } from '../../../application/dto/update-return-detail.dto.js';
export declare class ReturnDetailsController {
    private readonly createDetail;
    private readonly updateDetail;
    private readonly deleteDetail;
    private readonly findDetail;
    private readonly listDetails;
    constructor(createDetail: CreateReturnDetailUseCase, updateDetail: UpdateReturnDetailUseCase, deleteDetail: DeleteReturnDetailUseCase, findDetail: FindReturnDetailUseCase, listDetails: ListReturnDetailsUseCase);
    create(dto: CreateReturnDetailDto): Promise<import("../../../index.js").ReturnDetail>;
    list(): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<import("../../../index.js").ReturnDetail>>;
    find(id: number): Promise<import("../../../index.js").ReturnDetail | null>;
    update(id: number, dto: UpdateReturnDetailDto): Promise<import("../../../index.js").ReturnDetail>;
    delete(id: number): Promise<void>;
}
