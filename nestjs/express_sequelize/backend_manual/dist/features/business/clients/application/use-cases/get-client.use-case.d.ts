import { type IClientRepository } from '../../domain/interfaces/client-repository.interface.js';
export declare class GetClientUseCase {
    private readonly clientRepository;
    constructor(clientRepository: IClientRepository);
    execute(id: number): Promise<import("../dto/client-response.dto.js").ClientResponseDto>;
}
