import { Inject, Injectable } from '@nestjs/common';
import { ProductTypeNotFoundException } from '../../../product-types/domain/exceptions/product-type-not-found.exception.js';
import {
  IProductTypeRepository,
  PRODUCT_TYPE_REPOSITORY,
} from '../../../product-types/domain/interfaces/product-type-repository.interface.js';
import { Product } from '../../domain/entities/product.entity.js';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/interfaces/product-repository.interface.js';
import { CreateProductDto } from '../dto/create-product.dto.js';
import { ProductMapper } from '../mappers/product.mapper.js';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(PRODUCT_TYPE_REPOSITORY)
    private readonly productTypeRepository: IProductTypeRepository,
  ) {}

  async execute(dto: CreateProductDto) {
    const productType = await this.productTypeRepository.findById(dto.productTypeId);
    if (!productType) {
      throw new ProductTypeNotFoundException(dto.productTypeId);
    }

    const product = Product.create(dto);
    const created = await this.productRepository.create(product);
    return ProductMapper.toResponse(created);
  }
}
