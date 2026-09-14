import { ProductRepository } from './product.repository.js';
import { Product } from '../../../domain/entities/product.entity.js';

describe('ProductRepository', () => {
  let repository: ProductRepository;

  beforeEach(() => {
    repository = new ProductRepository();
  });

  it('should create a product', async () => {
    const product = Product.create({
      name: 'Phone',
      brand: 'TechBrand',
      price: 500,
      minStock: 2,
      quantity: 20,
      productTypeId: 1,
    });

    const created = await repository.create(product);
    expect(created.name).toBe('Phone');
  });
});
