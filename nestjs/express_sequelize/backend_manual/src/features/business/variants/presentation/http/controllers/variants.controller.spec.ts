import { VariantsController } from './variants.controller.js';
import { CreateVariantUseCase } from '../../../application/use-cases/create-variant.use-case.js';

describe('VariantsController', () => {
  it('should call create use case', async () => {
    const mockUseCase = { execute: jest.fn().mockResolvedValue({ id: 1, name: 'Talla M' }) };
    const controller = new VariantsController(
      mockUseCase as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
    );
    const result = await controller.create({ productId: 1, name: 'Talla M' });
    expect(result.id).toBe(1);
    expect(result.name).toBe('Talla M');
  });
});
