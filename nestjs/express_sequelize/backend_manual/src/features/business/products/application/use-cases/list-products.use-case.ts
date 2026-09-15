import { Inject, Injectable } from '@nestjs/common';
import type { IProductRepository } from '../../domain/interfaces/product-repository.interface.js';
import { PRODUCT_REPOSITORY } from '../../domain/interfaces/product-repository.interface.js';
import { ProductFilterDto } from '../dto/product-filter.dto.js';
import { ProductMapper } from '../mappers/product.mapper.js';

@Injectable()
export class ListProductsUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(filter: ProductFilterDto) {
    const result = await this.productRepository.findAll(filter);
    return {
      items: result.items.map((product) => ProductMapper.toResponse(product)),
      meta: result.meta,
    };
  }
}
