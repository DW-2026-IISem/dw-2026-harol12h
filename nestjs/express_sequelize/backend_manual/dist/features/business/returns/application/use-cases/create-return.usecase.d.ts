import { Return } from '../../domain/entities/return.entity.js';
import { IReturnRepository } from '../../domain/interfaces/return-repository.interface.js';
export declare class CreateReturnUseCase {
    private readonly repository;
    constructor(repository: IReturnRepository);
    execute(props: Omit<Return, 'id' | 'createdAt' | 'updatedAt'>): Promise<Return>;
}
