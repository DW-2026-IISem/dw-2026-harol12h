import { Inject, Injectable } from '@nestjs/common';
import type { IProductRepository } from '../../domain/interfaces/product-repository.interface.js';
import { PRODUCT_REPOSITORY } from '../../domain/interfaces/product-repository.interface.js';
import { CreateProductDto } from '../dto/create-product.dto.js';
import { Product } from '../../domain/entities/product.entity.js';
import { ProductMapper } from '../mappers/product.mapper.js';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(dto: CreateProductDto) {
    const product = Product.create({
      name: dto.name,
      brand: dto.brand,
      price: dto.price,
      minStock: dto.minStock,
      quantity: dto.quantity,
      productTypeId: dto.productTypeId,
      collectionId: dto.collectionId,
      status: dto.status,
    });
    const created = await this.productRepository.create(product);
    return ProductMapper.toResponse(created);
  }
}
