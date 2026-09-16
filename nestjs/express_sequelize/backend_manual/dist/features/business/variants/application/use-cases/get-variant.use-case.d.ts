import type { IVariantRepository } from '../../domain/interfaces/variant-repository.interface.js';
export declare class GetVariantUseCase {
    private readonly variantRepository;
    constructor(variantRepository: IVariantRepository);
    execute(id: number): Promise<import("../dto/variant-response.dto.js").VariantResponseDto>;
}
