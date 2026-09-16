import { Inject, Injectable } from '@nestjs/common';
import { Variant } from '../../domain/entities/variant.entity.js';
import type { IVariantRepository } from '../../domain/interfaces/variant-repository.interface.js';
import { VARIANT_REPOSITORY } from '../../domain/interfaces/variant-repository.interface.js';
import { CreateVariantDto } from '../dto/create-variant.dto.js';
import { VariantMapper } from '../mappers/variant.mapper.js';

@Injectable()
export class CreateVariantUseCase {
  constructor(
    @Inject(VARIANT_REPOSITORY)
    private readonly variantRepository: IVariantRepository,
  ) {}

  async execute(dto: CreateVariantDto) {
    const variant = Variant.create(dto);
    const created = await this.variantRepository.create(variant);
    return VariantMapper.toResponse(created);
  }
}
