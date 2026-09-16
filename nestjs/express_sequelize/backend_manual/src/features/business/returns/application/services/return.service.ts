import { Injectable, Inject } from '@nestjs/common';
import { Return } from '../../domain/entities/return.entity.js';
import { IReturnRepository, RETURN_REPOSITORY } from '../../domain/interfaces/return-repository.interface.js';

@Injectable()
export class ReturnService {
  constructor(
    @Inject(RETURN_REPOSITORY)
    private readonly repository: IReturnRepository,
  ) {}

  async processReturn(returnEntity: Return): Promise<Return> {
    // Aquí podrías integrar lógica adicional (ej: validaciones de inventario)
    return this.repository.create(returnEntity);
  }
}
