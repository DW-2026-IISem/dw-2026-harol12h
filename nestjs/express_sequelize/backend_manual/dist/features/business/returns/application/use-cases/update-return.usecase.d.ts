import { Return } from '../../domain/entities/return.entity.js';
import { IReturnRepository } from '../../domain/interfaces/return-repository.interface.js';
export declare class UpdateReturnUseCase {
    private readonly repository;
    constructor(repository: IReturnRepository);
    execute(returnEntity: Return): Promise<Return>;
}
