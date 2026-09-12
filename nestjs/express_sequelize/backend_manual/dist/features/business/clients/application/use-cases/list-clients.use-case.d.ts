import { type IClientRepository } from '../../domain/interfaces/client-repository.interface.js';
import { ClientFilterDto } from '../dto/client-filter.dto.js';
export declare class ListClientsUseCase {
    private readonly clientRepository;
    constructor(clientRepository: IClientRepository);
    execute(filter: ClientFilterDto): Promise<{
        items: import("../dto/client-response.dto.js").ClientResponseDto[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
