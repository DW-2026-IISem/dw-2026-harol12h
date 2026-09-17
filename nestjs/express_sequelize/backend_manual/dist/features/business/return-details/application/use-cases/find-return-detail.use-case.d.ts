import { ReturnDetail } from '../../domain/entities/return-detail.entity.js';
import { IReturnDetailRepository } from '../../domain/interfaces/return-detail-repository.interface.js';
export declare class FindReturnDetailUseCase {
    private readonly repository;
    constructor(repository: IReturnDetailRepository);
    execute(id: number): Promise<ReturnDetail | null>;
}
