import { Inject, Injectable } from '@nestjs/common';
import type { IVariantRepository } from '../../domain/interfaces/variant-repository.interface.js';
import { VARIANT_REPOSITORY } from '../../domain/interfaces/variant-repository.interface.js';
import { VariantFilterDto } from '../dto/variant-filter.dto.js';
import { VariantMapper } from '../mappers/variant.mapper.js';
import { Variant } from '../../domain/entities/variant.entity.js';

@Injectable()
export class ListVariantsUseCase {
  constructor(
    @Inject(VARIANT_REPOSITORY)
    private readonly variantRepository: IVariantRepository,
  ) {}

  async execute(filter: VariantFilterDto) {
    const result = await this.variantRepository.findAll(filter);
    return {
      items: result.items.map((v: Variant) => VariantMapper.toResponse(v)),
      meta: result.meta,
    };
  }
}
