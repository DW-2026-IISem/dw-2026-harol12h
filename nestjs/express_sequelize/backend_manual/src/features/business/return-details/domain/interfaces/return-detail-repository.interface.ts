import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { ReturnDetail } from '../entities/return-detail.entity.js';

export const RETURN_DETAIL_REPOSITORY = 'RETURN_DETAIL_REPOSITORY';

export interface ReturnDetailFindAllParams {
  page?: number;
  limit?: number;
  returnId?: number;
  productId?: number;
}

export interface IReturnDetailRepository {
  create(detail: ReturnDetail): Promise<ReturnDetail>;
  update(detail: ReturnDetail): Promise<ReturnDetail>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<ReturnDetail | null>;
  findAll(params: ReturnDetailFindAllParams): Promise<PaginatedResult<ReturnDetail>>;
}
