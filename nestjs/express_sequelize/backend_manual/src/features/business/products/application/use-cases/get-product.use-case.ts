import { Inject, Injectable } from '@nestjs/common';
import type { IProductRepository } from '../../domain/interfaces/product-repository.interface.js';
import { PRODUCT_REPOSITORY } from '../../domain/interfaces/product-repository.interface.js';
import { ProductMapper } from '../mappers/product.mapper.js';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: number) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error(`Product ${id} not found`);
    return ProductMapper.toResponse(product);
  }
}
