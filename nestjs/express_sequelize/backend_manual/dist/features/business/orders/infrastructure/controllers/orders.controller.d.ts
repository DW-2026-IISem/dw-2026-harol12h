import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case.js';
import { GetOrderUseCase } from '../../application/use-cases/get-order.use-case.js';
import { ListOrdersUseCase } from '../../application/use-cases/list-orders.use-case.js';
import { UpdateOrderUseCase } from '../../application/use-cases/update-order.use-case.js';
import { DeleteOrderUseCase } from '../../application/use-cases/delete-order.use-case.js';
import { CreateOrderDto } from '../../application/dto/create-order.dto.js';
import { UpdateOrderDto } from '../../application/dto/update-order.dto.js';
export declare class OrdersController {
    private readonly createOrder;
    private readonly getOrder;
    private readonly listOrders;
    private readonly updateOrder;
    private readonly deleteOrder;
    constructor(createOrder: CreateOrderUseCase, getOrder: GetOrderUseCase, listOrders: ListOrdersUseCase, updateOrder: UpdateOrderUseCase, deleteOrder: DeleteOrderUseCase);
    create(dto: CreateOrderDto): Promise<import("../../application/dto/order-response.dto.js").OrderResponseDto>;
    findAll(): Promise<{
        items: import("../../application/dto/order-response.dto.js").OrderResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
    findOne(id: number): Promise<import("../../application/dto/order-response.dto.js").OrderResponseDto>;
    update(id: number, dto: UpdateOrderDto): Promise<import("../../application/dto/order-response.dto.js").OrderResponseDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
