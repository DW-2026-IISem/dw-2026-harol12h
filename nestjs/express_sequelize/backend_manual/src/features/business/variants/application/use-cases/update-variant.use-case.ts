import { Inject, Injectable } from '@nestjs/common';
import { VariantNotFoundException } from '../../domain/exceptions/variant-not-found.exception.js';
import type { IVariantRepository } from '../../domain/interfaces/variant-repository.interface.js';
import { VARIANT_REPOSITORY } from '../../domain/interfaces/variant-repository.interface.js';
import { UpdateVariantDto } from '../dto/update-variant.dto.js';
import { VariantMapper } from '../mappers/variant.mapper.js';

@Injectable()
export class UpdateVariantUseCase {
  constructor(
    @Inject(VARIANT_REPOSITORY)
    private readonly variantRepository: IVariantRepository,
  ) {}

  async execute(id: number, dto: UpdateVariantDto) {
    const variant = await this.variantRepository.findById(id);
    if (!variant) throw new VariantNotFoundException(id);

    variant.update(dto);
    const updated = await this.variantRepository.update(variant);
    return VariantMapper.toResponse(updated);
  }
}
