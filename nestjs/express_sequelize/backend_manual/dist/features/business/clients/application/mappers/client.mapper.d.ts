import { Client } from '../../domain/entities/client.entity.js';
import { ClientResponseDto } from '../dto/client-response.dto.js';
import { ClientModel } from '../../infrastructure/persistence/models/client.model.js';
export declare class ClientMapper {
    static toDomain(model: ClientModel): Client;
    static toResponse(entity: Client): ClientResponseDto;
    static toPersistence(entity: Client): Partial<ClientModel>;
}
