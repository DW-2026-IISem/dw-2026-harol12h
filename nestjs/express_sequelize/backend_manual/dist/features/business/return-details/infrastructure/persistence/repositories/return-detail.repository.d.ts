import { ReturnDetail } from '../../../domain/entities/return-detail.entity.js';
import type { IReturnDetailRepository, ReturnDetailFindAllParams } from '../../../domain/interfaces/return-detail-repository.interface.js';
export declare class ReturnDetailRepository implements IReturnDetailRepository {
    create(detail: ReturnDetail): Promise<ReturnDetail>;
    update(detail: ReturnDetail): Promise<ReturnDetail>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<ReturnDetail | null>;
    findAll(params: ReturnDetailFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<ReturnDetail>>;
}
