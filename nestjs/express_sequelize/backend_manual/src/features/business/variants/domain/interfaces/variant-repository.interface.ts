import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { Variant } from '../entities/variant.entity.js';

export const VARIANT_REPOSITORY = 'VARIANT_REPOSITORY';

export interface VariantFindAllParams {
  page?: number;
  limit?: number;
  productId?: number;
  search?: string;
}

export interface IVariantRepository {
  create(variant: Variant): Promise<Variant>;
  update(variant: Variant): Promise<Variant>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Variant | null>;
  findAll(params: VariantFindAllParams): Promise<PaginatedResult<Variant>>;
}
