import { Inject, Injectable } from '@nestjs/common';
import { ProductNotFoundException } from '../../domain/exceptions/product-not-found.exception.js';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/interfaces/product-repository.interface.js';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    await this.productRepository.delete(id);
  }
}
