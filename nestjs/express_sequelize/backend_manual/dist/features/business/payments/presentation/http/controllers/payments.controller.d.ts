import { CreatePaymentUseCase } from '../../../application/use-cases/create-payment.usecase.js';
import { UpdatePaymentUseCase } from '../../../application/use-cases/update-payment.usecase.js';
import { DeletePaymentUseCase } from '../../../application/use-cases/delete-payment.usecase.js';
import { FindPaymentUseCase } from '../../../application/use-cases/find-payment.usecase.js';
import { ListPaymentsUseCase } from '../../../application/use-cases/list-payments.usecase.js';
import { CreatePaymentDto } from '../../../application/dto/create-payment.dto.js';
import { UpdatePaymentDto } from '../../../application/dto/update-payment.dto.js';
export declare class PaymentsController {
    private readonly createPayment;
    private readonly updatePayment;
    private readonly deletePayment;
    private readonly findPayment;
    private readonly listPayments;
    constructor(createPayment: CreatePaymentUseCase, updatePayment: UpdatePaymentUseCase, deletePayment: DeletePaymentUseCase, findPayment: FindPaymentUseCase, listPayments: ListPaymentsUseCase);
    create(dto: CreatePaymentDto): Promise<import("../../../index.js").Payment>;
    list(): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<import("../../../index.js").Payment>>;
    find(id: number): Promise<import("../../../index.js").Payment | null>;
    update(id: number, dto: UpdatePaymentDto): Promise<import("../../../index.js").Payment>;
    delete(id: number): Promise<void>;
}
