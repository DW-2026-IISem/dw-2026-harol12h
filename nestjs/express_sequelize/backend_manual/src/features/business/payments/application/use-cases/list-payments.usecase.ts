import { Injectable } from '@nestjs/common';
import { IPaymentRepository, PAYMENT_REPOSITORY, PaymentFindAllParams } from '../../domain/interfaces/payment-repository.interface.js';
import { Inject } from '@nestjs/common';

@Injectable()
export class ListPaymentsUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly repository: IPaymentRepository,
  ) {}

  async execute(params: PaymentFindAllParams) {
    return this.repository.findAll(params);
  }
}
