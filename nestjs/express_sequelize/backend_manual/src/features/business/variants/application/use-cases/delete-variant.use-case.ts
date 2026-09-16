import { Inject, Injectable } from '@nestjs/common';
import { VariantNotFoundException } from '../../domain/exceptions/variant-not-found.exception.js';
import type { IVariantRepository } from '../../domain/interfaces/variant-repository.interface.js';
import { VARIANT_REPOSITORY } from '../../domain/interfaces/variant-repository.interface.js';

@Injectable()
export class DeleteVariantUseCase {
  constructor(
    @Inject(VARIANT_REPOSITORY)
    private readonly variantRepository: IVariantRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const variant = await this.variantRepository.findById(id);
    if (!variant) throw new VariantNotFoundException(id);
    await this.variantRepository.delete(id);
  }
}
