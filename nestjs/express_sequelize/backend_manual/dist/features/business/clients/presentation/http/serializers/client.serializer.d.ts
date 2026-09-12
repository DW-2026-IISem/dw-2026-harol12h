import { Client } from '../../../domain/entities/client.entity.js';
import { ClientResponseDto } from '../../../application/dto/client-response.dto.js';
export declare class ClientSerializer {
    static serialize(entity: Client): ClientResponseDto;
}
