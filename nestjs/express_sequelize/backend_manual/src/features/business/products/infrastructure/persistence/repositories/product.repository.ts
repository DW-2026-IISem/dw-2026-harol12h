import { Injectable } from '@nestjs/common';
import { ProductModel } from '../models/product.model.js';
import { Product } from '../../../domain/entities/product.entity.js';
import { ProductMapper } from '../../../application/mappers/product.mapper.js';
import { ProductFilterDto } from '../../../application/dto/product-filter.dto.js';

@Injectable()
export class ProductRepository {
  async create(product: Product): Promise<ProductModel> {
    return await ProductModel.create(ProductMapper.toPersistence(product));
  }

  async update(product: Product): Promise<ProductModel> {
    await ProductModel.update(ProductMapper.toPersistence(product), {
      where: { id: product.id },
    });
    const updated = await ProductModel.findByPk(product.id!);
    return updated!;
  }

  async findById(id: number): Promise<ProductModel | null> {
    return await ProductModel.findByPk(id);
  }

  async findAll(filter?: ProductFilterDto): Promise<{ items: ProductModel[] }> {
    const rows = await ProductModel.findAll({ where: { ...filter } });
    return { items: rows };
  }

  async delete(id: number): Promise<void> {
    const existing = await ProductModel.findByPk(id);
    if (existing) await existing.destroy();
  }
}
