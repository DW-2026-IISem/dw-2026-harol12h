var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { PaymentsController } from './presentation/http/controllers/payments.controller.js';
import { PaymentRepository } from './infrastructure/persistence/repositories/payment.repository.js';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.usecase.js';
import { UpdatePaymentUseCase } from './application/use-cases/update-payment.usecase.js';
import { DeletePaymentUseCase } from './application/use-cases/delete-payment.usecase.js';
import { FindPaymentUseCase } from './application/use-cases/find-payment.usecase.js';
import { ListPaymentsUseCase } from './application/use-cases/list-payments.usecase.js';
import { PAYMENT_REPOSITORY } from './domain/interfaces/payment-repository.interface.js';
let PaymentsModule = class PaymentsModule {
};
PaymentsModule = __decorate([
    Module({
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
], PaymentsModule);
export { PaymentsModule };
//# sourceMappingURL=payments.module.js.map