import { Injectable } from '@nestjs/common';
import { IPaymentRepository, PAYMENT_REPOSITORY } from '../../domain/interfaces/payment-repository.interface.js';
import { Inject } from '@nestjs/common';

@Injectable()
export class DeletePaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly repository: IPaymentRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
