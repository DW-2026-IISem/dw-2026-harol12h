import { CreateBranchUseCase } from './create-branch.use-case.js';
import { Branch } from '../../domain/entities/branch.entity.js';
import type { IBranchRepository } from '../../domain/interfaces/branch-repository.interface.js';

class MockBranchRepository implements IBranchRepository {
  async create(branch: Branch): Promise<Branch> { return branch; }
  async update(branch: Branch): Promise<Branch> { return branch; }
  async delete(id: number): Promise<void> {}
  async findById(id: number): Promise<Branch | null> { return null; }
  async findAll(): Promise<any> { return { items: [], meta: {} }; }
}

describe('CreateBranchUseCase', () => {
  it('should create a branch', async () => {
    const repo = new MockBranchRepository();
    const useCase = new CreateBranchUseCase(repo as any);
    const result = await useCase.execute({ name: 'Sucursal Principal' });
    expect(result.name).toBe('Sucursal Principal');
  });
});
