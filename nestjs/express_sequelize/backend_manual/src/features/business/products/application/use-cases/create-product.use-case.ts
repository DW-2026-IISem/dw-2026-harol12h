import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity.js';
import * as productRepositoryInterface from '../../domain/interfaces/product-repository.interface.js';
import { CreateProductDto } from '../dto/create-product.dto.js';
import { ProductMapper } from '../mappers/product.mapper.js';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(productRepositoryInterface.PRODUCT_REPOSITORY)
    private readonly productRepository: productRepositoryInterface.IProductRepository,
  ) {}

  async execute(dto: CreateProductDto) {
    const product = Product.create(dto);
    const created = await this.productRepository.create(product);
    return ProductMapper.toResponse(created);
  }
}
