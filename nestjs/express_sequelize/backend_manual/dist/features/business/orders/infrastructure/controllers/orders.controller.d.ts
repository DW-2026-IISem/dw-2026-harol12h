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
    create(dto: CreateOrderDto): Promise<{
        id: any;
        clientId: number;
        orderDate: Date;
        status: string;
        createdAt: any;
        updatedAt: any;
    }>;
    findAll(): Promise<{
        id: any;
        clientId: number;
        orderDate: Date;
        status: string;
        createdAt: any;
        updatedAt: any;
    }[]>;
    findOne(id: number): Promise<{
        id: any;
        clientId: number;
        orderDate: Date;
        status: string;
        createdAt: any;
        updatedAt: any;
    }>;
    update(id: number, dto: UpdateOrderDto): Promise<{
        id: any;
        clientId: number;
        orderDate: Date;
        status: string;
        createdAt: any;
        updatedAt: any;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
