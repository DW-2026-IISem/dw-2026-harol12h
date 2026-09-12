import { CreateClientDto } from '../../../application/dto/create-client.dto.js';
import { UpdateClientDto } from '../../../application/dto/update-client.dto.js';
import { ClientFilterDto } from '../../../application/dto/client-filter.dto.js';
import { ClientResponseDto } from '../../../application/dto/client-response.dto.js';
import { CreateClientUseCase } from '../../../application/use-cases/create-client.use-case.js';
import { UpdateClientUseCase } from '../../../application/use-cases/update-client.use-case.js';
import { DeleteClientUseCase } from '../../../application/use-cases/delete-client.use-case.js';
import { GetClientUseCase } from '../../../application/use-cases/get-client.use-case.js';
import { ListClientsUseCase } from '../../../application/use-cases/list-clients.use-case.js';
export declare class ClientsController {
    private readonly createClientUseCase;
    private readonly updateClientUseCase;
    private readonly deleteClientUseCase;
    private readonly getClientUseCase;
    private readonly listClientsUseCase;
    constructor(createClientUseCase: CreateClientUseCase, updateClientUseCase: UpdateClientUseCase, deleteClientUseCase: DeleteClientUseCase, getClientUseCase: GetClientUseCase, listClientsUseCase: ListClientsUseCase);
    create(dto: CreateClientDto): Promise<ClientResponseDto>;
    findAll(filter: ClientFilterDto): Promise<{
        items: ClientResponseDto[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<ClientResponseDto>;
    update(id: number, dto: UpdateClientDto): Promise<ClientResponseDto>;
    remove(id: number): Promise<void>;
}
