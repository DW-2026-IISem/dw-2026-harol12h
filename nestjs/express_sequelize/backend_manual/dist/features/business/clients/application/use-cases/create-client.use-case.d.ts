import { type IPasswordHasher } from '../../../../../infrastructure/security/hashing/password-hasher.interface.js';
import { type IClientRepository } from '../../domain/interfaces/client-repository.interface.js';
import { CreateClientDto } from '../dto/create-client.dto.js';
export declare class CreateClientUseCase {
    private readonly clientRepository;
    private readonly passwordHasher;
    constructor(clientRepository: IClientRepository, passwordHasher: IPasswordHasher);
    execute(dto: CreateClientDto): Promise<import("../dto/client-response.dto.js").ClientResponseDto>;
}
