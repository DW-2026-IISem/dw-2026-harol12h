import { Variant } from '../../../domain/entities/variant.entity.js';
import type { IVariantRepository, VariantFindAllParams } from '../../../domain/interfaces/variant-repository.interface.js';
export declare class VariantRepository implements IVariantRepository {
    create(variant: Variant): Promise<Variant>;
    update(variant: Variant): Promise<Variant>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Variant | null>;
    findAll(params: VariantFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<Variant>>;
}
