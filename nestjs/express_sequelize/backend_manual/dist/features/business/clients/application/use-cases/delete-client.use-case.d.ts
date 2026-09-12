import { type IClientRepository } from '../../domain/interfaces/client-repository.interface.js';
export declare class DeleteClientUseCase {
    private readonly clientRepository;
    constructor(clientRepository: IClientRepository);
    execute(id: number): Promise<void>;
}
