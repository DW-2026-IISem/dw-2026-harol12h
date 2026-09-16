import { CreateVariantUseCase } from './create-variant.use-case.js';
import { Variant } from '../../domain/entities/variant.entity.js';
import type { IVariantRepository } from '../../domain/interfaces/variant-repository.interface.js';

class MockVariantRepository implements IVariantRepository {
  async create(variant: Variant): Promise<Variant> { return variant; }
  async update(variant: Variant): Promise<Variant> { return variant; }
  async delete(id: number): Promise<void> {}
  async findById(id: number): Promise<Variant | null> { return null; }
  async findAll(): Promise<any> { return { items: [], meta: {} }; }
}

describe('CreateVariantUseCase', () => {
  it('should create a variant', async () => {
    const repo = new MockVariantRepository();
    const useCase = new CreateVariantUseCase(repo as any);
    const result = await useCase.execute({
      productId: 1,
      name: 'Talla M',
    });
    expect(result.productId).toBe(1);
    expect(result.name).toBe('Talla M');
  });
});
