import { Module } from '@nestjs/common';
import { PaymentsController } from './presentation/http/controllers/payments.controller.js';
import { PaymentRepository } from './infrastructure/persistence/repositories/payment.repository.js';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.usecase.js';
import { UpdatePaymentUseCase } from './application/use-cases/update-payment.usecase.js';
import { DeletePaymentUseCase } from './application/use-cases/delete-payment.usecase.js';
import { FindPaymentUseCase } from './application/use-cases/find-payment.usecase.js';
import { ListPaymentsUseCase } from './application/use-cases/list-payments.usecase.js';
import { PAYMENT_REPOSITORY } from './domain/interfaces/payment-repository.interface.js';

@Module({
  controllers: [PaymentsController],
  providers: [
    { provide: PAYMENT_REPOSITORY, useClass: PaymentRepository },
    CreatePaymentUseCase,
    UpdatePaymentUseCase,
    DeletePaymentUseCase,
    FindPaymentUseCase,
    ListPaymentsUseCase,
  ],
})
export class PaymentsModule {}
