import { Return } from '../../domain/entities/return.entity.js';
import { IReturnRepository } from '../../domain/interfaces/return-repository.interface.js';
export declare class ReturnService {
    private readonly repository;
    constructor(repository: IReturnRepository);
    processReturn(returnEntity: Return): Promise<Return>;
}
