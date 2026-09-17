import { ReturnDetail } from '../../domain/entities/return-detail.entity.js';
import { IReturnDetailRepository } from '../../domain/interfaces/return-detail-repository.interface.js';
export declare class CreateReturnDetailUseCase {
    private readonly repository;
    constructor(repository: IReturnDetailRepository);
    execute(props: Omit<ReturnDetail, 'id' | 'createdAt' | 'updatedAt'>): Promise<ReturnDetail>;
}
