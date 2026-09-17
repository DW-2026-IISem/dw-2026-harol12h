import { ReturnDetail } from '../../domain/entities/return-detail.entity.js';
import { IReturnDetailRepository } from '../../domain/interfaces/return-detail-repository.interface.js';
export declare class UpdateReturnDetailUseCase {
    private readonly repository;
    constructor(repository: IReturnDetailRepository);
    execute(detail: ReturnDetail): Promise<ReturnDetail>;
}
