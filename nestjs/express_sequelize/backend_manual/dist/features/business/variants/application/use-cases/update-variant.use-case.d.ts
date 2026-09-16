import type { IVariantRepository } from '../../domain/interfaces/variant-repository.interface.js';
import { UpdateVariantDto } from '../dto/update-variant.dto.js';
export declare class UpdateVariantUseCase {
    private readonly variantRepository;
    constructor(variantRepository: IVariantRepository);
    execute(id: number, dto: UpdateVariantDto): Promise<import("../dto/variant-response.dto.js").VariantResponseDto>;
}
