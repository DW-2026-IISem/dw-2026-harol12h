import { Injectable } from '@nestjs/common';
import { Payment } from '../../domain/entities/payment.entity.js';
import { IPaymentRepository, PAYMENT_REPOSITORY } from '../../domain/interfaces/payment-repository.interface.js';
import { Inject } from '@nestjs/common';

@Injectable()
export class FindPaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly repository: IPaymentRepository,
  ) {}

  async execute(id: number): Promise<Payment | null> {
    return this.repository.findById(id);
  }
}
