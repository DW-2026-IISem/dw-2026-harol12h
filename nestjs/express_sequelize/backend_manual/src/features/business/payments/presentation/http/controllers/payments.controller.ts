import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { CreatePaymentUseCase } from '../../../application/use-cases/create-payment.usecase.js';
import { UpdatePaymentUseCase } from '../../../application/use-cases/update-payment.usecase.js';
import { DeletePaymentUseCase } from '../../../application/use-cases/delete-payment.usecase.js';
import { FindPaymentUseCase } from '../../../application/use-cases/find-payment.usecase.js';
import { ListPaymentsUseCase } from '../../../application/use-cases/list-payments.usecase.js';
import { CreatePaymentDto } from '../../../application/dto/create-payment.dto.js';
import { UpdatePaymentDto } from '../../../application/dto/update-payment.dto.js';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly createPayment: CreatePaymentUseCase,
    private readonly updatePayment: UpdatePaymentUseCase,
    private readonly deletePayment: DeletePaymentUseCase,
    private readonly findPayment: FindPaymentUseCase,
    private readonly listPayments: ListPaymentsUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreatePaymentDto) {
    return this.createPayment.execute(dto);
  }

  @Get()
  async list() {
    return this.listPayments.execute({});
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    return this.findPayment.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdatePaymentDto) {
    const payment = { id, ...dto } as any;
    return this.updatePayment.execute(payment);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.deletePayment.execute(id);
  }
}
