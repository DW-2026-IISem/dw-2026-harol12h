import { Injectable } from '@nestjs/common';
import { Payment } from '../../domain/entities/payment.entity.js';
import { IPaymentRepository, PAYMENT_REPOSITORY } from '../../domain/interfaces/payment-repository.interface.js';
import { Inject } from '@nestjs/common';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly repository: IPaymentRepository,
  ) {}

  async execute(props: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
    const payment = Payment.create(props);
    return this.repository.create(payment);
  }
}
