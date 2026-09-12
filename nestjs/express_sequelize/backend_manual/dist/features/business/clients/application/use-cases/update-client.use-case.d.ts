import { type IPasswordHasher } from '../../../../../infrastructure/security/hashing/password-hasher.interface.js';
import { type IClientRepository } from '../../domain/interfaces/client-repository.interface.js';
import { UpdateClientDto } from '../dto/update-client.dto.js';
export declare class UpdateClientUseCase {
    private readonly clientRepository;
    private readonly passwordHasher;
    constructor(clientRepository: IClientRepository, passwordHasher: IPasswordHasher);
    execute(id: number, dto: UpdateClientDto): Promise<import("../dto/client-response.dto.js").ClientResponseDto>;
}
