import { CreateOrderDetailUseCase } from '../../../application/use-cases/create-order-detail.use-case.js';
import { UpdateOrderDetailUseCase } from '../../../application/use-cases/update-order-detail.use-case.js';
import { DeleteOrderDetailUseCase } from '../../../application/use-cases/delete-order-detail.use-case.js';
import { GetOrderDetailUseCase } from '../../../application/use-cases/get-order-detail.use-case.js';
import { ListOrderDetailsUseCase } from '../../../application/use-cases/list-order-details.use-case.js';
export declare class OrderDetailsController {
    private readonly createOrderDetailUseCase;
    private readonly updateOrderDetailUseCase;
    private readonly deleteOrderDetailUseCase;
    private readonly getOrderDetailUseCase;
    private readonly listOrderDetailsUseCase;
    constructor(createOrderDetailUseCase: CreateOrderDetailUseCase, updateOrderDetailUseCase: UpdateOrderDetailUseCase, deleteOrderDetailUseCase: DeleteOrderDetailUseCase, getOrderDetailUseCase: GetOrderDetailUseCase, listOrderDetailsUseCase: ListOrderDetailsUseCase);
    create(dto: {
        orderId: number;
        productId: number;
        quantity: number;
        unitPrice: number;
    }): Promise<{
        id: number;
        orderId: number;
        productId: number;
        quantity: number;
        unitPrice: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(filter: {
        orderId?: number;
        page?: number;
        limit?: number;
    }): Promise<{
        items: {
            id: number;
            orderId: number;
            productId: number;
            quantity: number;
            unitPrice: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: import("../../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
    findOne(id: number): Promise<{
        id: number;
        orderId: number;
        productId: number;
        quantity: number;
        unitPrice: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dto: Partial<{
        quantity: number;
        unitPrice: number;
    }>): Promise<{
        id: number;
        orderId: number;
        productId: number;
        quantity: number;
        unitPrice: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<void>;
}
