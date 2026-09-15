import { Product } from './product.entity.js';
import { InvalidProductPriceException } from '../exceptions/invalid-product-price.exception.js';
import { InvalidProductStockException } from '../exceptions/invalid-product-stock.exception.js';

describe('Product Entity', () => {
  it('should create a valid product', () => {
    const product = Product.create({
      name: 'Laptop',
      brand: 'TechBrand',
      price: 1000,
      minStock: 5,
      quantity: 10,
      productTypeId: 1,
      collectionId: 1,
    });
    expect(product.name).toBe('Laptop');
    expect(product.price).toBe(1000);
  });

  it('should throw error for invalid price', () => {
    expect(() =>
      Product.create({
        name: 'Laptop',
        brand: 'TechBrand',
        price: -1,
        minStock: 5,
        quantity: 10,
        productTypeId: 1,
        collectionId: 1,
      }),
    ).toThrow(InvalidProductPriceException);
  });

  it('should throw error for invalid stock', () => {
    expect(() =>
      Product.create({
        name: 'Laptop',
        brand: 'TechBrand',
        price: 1000,
        minStock: -5,
        quantity: 10,
        productTypeId: 1,
        collectionId: 1,
      }),
    ).toThrow(InvalidProductStockException);
  });
});
