import { Client } from '../../../domain/entities/client.entity.js';
import { IClientRepository, PaginatedResult } from '../../../domain/interfaces/client-repository.interface.js';
import { ClientFilterDto } from '../../../application/dto/client-filter.dto.js';
export declare class ClientRepository implements IClientRepository {
    create(client: Client): Promise<Client>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Client | null>;
    findByEmail(email: string): Promise<Client | null>;
    findAll(params: ClientFilterDto): Promise<PaginatedResult<Client>>;
}
