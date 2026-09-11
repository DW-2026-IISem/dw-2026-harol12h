import { Client } from '../../../domain/entities/client.entity';
import { ClientResponseDto } from '../../../application/dto/client-response.dto';
import { ClientMapper } from '../../../application/mappers/client.mapper';

export class ClientSerializer {
  static serialize(entity: Client): ClientResponseDto {
    return ClientMapper.toResponse(entity);
  }
}
