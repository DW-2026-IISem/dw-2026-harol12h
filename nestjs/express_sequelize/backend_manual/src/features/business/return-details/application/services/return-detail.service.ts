import { Injectable, Inject } from '@nestjs/common';
import { ReturnDetail } from '../../domain/entities/return-detail.entity.js';
import { IReturnDetailRepository, RETURN_DETAIL_REPOSITORY } from '../../domain/interfaces/return-detail-repository.interface.js';

@Injectable()
export class ReturnDetailService {
  constructor(
    @Inject(RETURN_DETAIL_REPOSITORY)
    private readonly repository: IReturnDetailRepository,
  ) {}

  async processDetail(detail: ReturnDetail): Promise<ReturnDetail> {
    // Aquí podrías integrar lógica adicional (ej: validaciones de inventario)
    return this.repository.create(detail);
  }
}
