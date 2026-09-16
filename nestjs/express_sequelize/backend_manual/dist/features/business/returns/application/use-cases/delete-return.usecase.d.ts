import { IReturnRepository } from '../../domain/interfaces/return-repository.interface.js';
export declare class DeleteReturnUseCase {
    private readonly repository;
    constructor(repository: IReturnRepository);
    execute(id: number): Promise<void>;
}
