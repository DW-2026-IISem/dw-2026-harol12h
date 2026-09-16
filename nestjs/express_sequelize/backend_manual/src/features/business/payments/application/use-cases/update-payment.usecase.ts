import { Injectable } from '@nestjs/common';
import { Payment } from '../../domain/entities/payment.entity.js';
import { IPaymentRepository, PAYMENT_REPOSITORY } from '../../domain/interfaces/payment-repository.interface.js';
import { Inject } from '@nestjs/common';

@Injectable()
export class UpdatePaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly repository: IPaymentRepository,
  ) {}

  async execute(payment: Payment): Promise<Payment> {
    return this.repository.update(payment);
  }
}
