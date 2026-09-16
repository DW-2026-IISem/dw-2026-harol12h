import { Return } from '../../domain/entities/return.entity.js';
import { IReturnRepository } from '../../domain/interfaces/return-repository.interface.js';
export declare class FindReturnUseCase {
    private readonly repository;
    constructor(repository: IReturnRepository);
    execute(id: number): Promise<Return | null>;
}
