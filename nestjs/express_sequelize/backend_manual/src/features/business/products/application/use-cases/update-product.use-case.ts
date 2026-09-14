import { Inject, Injectable } from '@nestjs/common';
import { ProductNotFoundException } from '../../domain/exceptions/product-not-found.exception.js';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/interfaces/product-repository.interface.js';
import { UpdateProductDto } from '../dto/update-product.dto.js';
import { ProductMapper } from '../mappers/product.mapper.js';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: number, dto: UpdateProductDto) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }

    product.update(dto);
    const updated = await this.productRepository.update(product);
    return ProductMapper.toResponse(updated);
  }
}
