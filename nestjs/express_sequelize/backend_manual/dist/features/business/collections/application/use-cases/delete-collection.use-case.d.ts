import { type ICollectionRepository } from '../../domain/interfaces/collection-repository.interface.js';
export declare class DeleteCollectionUseCase {
    private readonly collectionRepository;
    constructor(collectionRepository: ICollectionRepository);
    execute(id: number): Promise<void>;
}
