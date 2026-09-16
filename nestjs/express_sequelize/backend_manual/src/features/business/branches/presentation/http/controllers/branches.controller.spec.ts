import { BranchesController } from './branches.controller.js';
import { CreateBranchUseCase } from '../../../application/use-cases/create-branch.use-case.js';

describe('BranchesController', () => {
  it('should call create use case', async () => {
    const mockUseCase = { execute: jest.fn().mockResolvedValue({ id: 1, name: 'Sucursal Principal' }) };
    const controller = new BranchesController(
      mockUseCase as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
    );
    const result = await controller.create({ name: 'Sucursal Principal' });
    expect(result.id).toBe(1);
    expect(result.name).toBe('Sucursal Principal');
  });
});
