import { Return } from '../../../domain/entities/return.entity.js';
import type { IReturnRepository, ReturnFindAllParams } from '../../../domain/interfaces/return-repository.interface.js';
export declare class ReturnRepository implements IReturnRepository {
    create(returnEntity: Return): Promise<Return>;
    update(returnEntity: Return): Promise<Return>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Return | null>;
    findAll(params: ReturnFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<Return>>;
}
