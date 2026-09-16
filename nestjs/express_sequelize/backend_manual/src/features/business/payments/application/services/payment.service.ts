import { Injectable } from '@nestjs/common';
import { Payment } from '../../domain/entities/payment.entity.js';
import { IPaymentRepository, PAYMENT_REPOSITORY } from '../../domain/interfaces/payment-repository.interface.js';
import { Inject } from '@nestjs/common';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly repository: IPaymentRepository,
  ) {}

  async processPayment(payment: Payment): Promise<Payment> {
    // Aquí podrías integrar lógica adicional (ej: integración con pasarela de pagos)
    return this.repository.create(payment);
  }
}
