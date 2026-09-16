import { IReturnRepository, ReturnFindAllParams } from '../../domain/interfaces/return-repository.interface.js';
export declare class ListReturnsUseCase {
    private readonly repository;
    constructor(repository: IReturnRepository);
    execute(params: ReturnFindAllParams): Promise<import("../../../../../common/interfaces/pagination.interface.js").PaginatedResult<import("../../domain/entities/return.entity.js").Return>>;
}
