import { IReturnDetailRepository } from '../../domain/interfaces/return-detail-repository.interface.js';
export declare class DeleteReturnDetailUseCase {
    private readonly repository;
    constructor(repository: IReturnDetailRepository);
    execute(id: number): Promise<void>;
}
