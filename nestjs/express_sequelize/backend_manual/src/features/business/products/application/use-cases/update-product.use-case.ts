import { Inject, Injectable } from '@nestjs/common';
import type { IProductRepository } from '../../domain/interfaces/product-repository.interface.js';
import { PRODUCT_REPOSITORY } from '../../domain/interfaces/product-repository.interface.js';
import { UpdateProductDto } from '../dto/update-product.dto.js';
import { ProductMapper } from '../mappers/product.mapper.js';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: number, dto: UpdateProductDto) {
    const existing = await this.productRepository.findById(id);
    if (!existing) throw new Error(`Product ${id} not found`);

    const domain = ProductMapper.toDomain(existing);
    const updatedDomain = { ...domain, ...dto };

    const updated = await this.productRepository.update(updatedDomain);
    return ProductMapper.toResponse(updated);
  }
}
