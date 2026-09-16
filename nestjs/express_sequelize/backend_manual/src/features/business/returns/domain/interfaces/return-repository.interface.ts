import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { Return } from '../entities/return.entity.js';

export const RETURN_REPOSITORY = 'RETURN_REPOSITORY';

export interface ReturnFindAllParams {
  page?: number;
  limit?: number;
  orderId?: number;
  status?: string;
}

export interface IReturnRepository {
  create(returnEntity: Return): Promise<Return>;
  update(returnEntity: Return): Promise<Return>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Return | null>;
  findAll(params: ReturnFindAllParams): Promise<PaginatedResult<Return>>;
}
