import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case.js';
import { GetOrderUseCase } from '../../application/use-cases/get-order.use-case.js';
import { ListOrdersUseCase } from '../../application/use-cases/list-orders.use-case.js';
import { UpdateOrderUseCase } from '../../application/use-cases/update-order.use-case.js';
import { DeleteOrderUseCase } from '../../application/use-cases/delete-order.use-case.js';
import { CreateOrderDto } from '../../application/dto/create-order.dto.js';
import { UpdateOrderDto } from '../../application/dto/update-order.dto.js';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrder: CreateOrderUseCase,
    private readonly getOrder: GetOrderUseCase,
    private readonly listOrders: ListOrdersUseCase,
    private readonly updateOrder: UpdateOrderUseCase,
    private readonly deleteOrder: DeleteOrderUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return this.createOrder.execute(dto);
  }

  @Get()
  async findAll() {
    return this.listOrders.execute({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.getOrder.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateOrderDto) {
    return this.updateOrder.execute(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.deleteOrder.execute(id);
    return { message: `Order ${id} deleted` };
  }
}
