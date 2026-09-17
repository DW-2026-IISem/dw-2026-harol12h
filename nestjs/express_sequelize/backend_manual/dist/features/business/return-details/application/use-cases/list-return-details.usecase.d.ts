import { IReturnDetailRepository, ReturnDetailFindAllParams } from '../../domain/interfaces/return-detail-repository.interface.js';
export declare class ListReturnDetailsUseCase {
    private readonly repository;
    constructor(repository: IReturnDetailRepository);
    execute(params: ReturnDetailFindAllParams): Promise<import("../../../../../common/interfaces/pagination.interface.js").PaginatedResult<import("../../index.js").ReturnDetail>>;
}
