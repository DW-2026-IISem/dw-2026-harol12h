import { CreateOrderDto } from '../../../application/dto/create-order.dto.js';
import { UpdateOrderDto } from '../../../application/dto/update-order.dto.js';
import { OrderFilterDto } from '../../../application/dto/order-filter.dto.js';
import { OrderResponseDto } from '../../../application/dto/order-response.dto.js';
import { CreateOrderUseCase } from '../../../application/use-cases/create-order.use-case.js';
import { UpdateOrderUseCase } from '../../../application/use-cases/update-order.use-case.js';
import { DeleteOrderUseCase } from '../../../application/use-cases/delete-order.use-case.js';
import { GetOrderUseCase } from '../../../application/use-cases/get-order.use-case.js';
import { ListOrdersUseCase } from '../../../application/use-cases/list-orders.use-case.js';
export declare class OrdersController {
    private readonly createOrderUseCase;
    private readonly updateOrderUseCase;
    private readonly deleteOrderUseCase;
    private readonly getOrderUseCase;
    private readonly listOrdersUseCase;
    constructor(createOrderUseCase: CreateOrderUseCase, updateOrderUseCase: UpdateOrderUseCase, deleteOrderUseCase: DeleteOrderUseCase, getOrderUseCase: GetOrderUseCase, listOrdersUseCase: ListOrdersUseCase);
    create(dto: CreateOrderDto): Promise<OrderResponseDto>;
    findAll(filter: OrderFilterDto): Promise<{
        items: OrderResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
    findOne(id: number): Promise<OrderResponseDto>;
    update(id: number, dto: UpdateOrderDto): Promise<OrderResponseDto>;
    remove(id: number): Promise<void>;
}
