import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParsePositiveIntPipe } from '../../../../../../common/pipes/parse-positive-int.pipe';
import { CreateOrderDto } from '../../../application/dto/create-order.dto';
import { UpdateOrderDto } from '../../../application/dto/update-order.dto';
import { OrderFilterDto } from '../../../application/dto/order-filter.dto';
import { OrderResponseDto } from '../../../application/dto/order-response.dto';
import { CreateOrderUseCase } from '../../../application/use-cases/create-order.use-case';
import { UpdateOrderUseCase } from '../../../application/use-cases/update-order.use-case';
import { DeleteOrderUseCase } from '../../../application/use-cases/delete-order.use-case';
import { GetOrderUseCase } from '../../../application/use-cases/get-order.use-case';
import { ListOrdersUseCase } from '../../../application/use-cases/list-orders.use-case';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly listOrdersUseCase: ListOrdersUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un pedido' })
  @ApiCreatedResponse({ type: OrderResponseDto })
  create(@Body() dto: CreateOrderDto) {
    return this.createOrderUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pedidos' })
  @ApiOkResponse({ type: [OrderResponseDto] })
  findAll(@Query() filter: OrderFilterDto) {
    return this.listOrdersUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiOkResponse({ type: OrderResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getOrderUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pedido' })
  @ApiOkResponse({ type: OrderResponseDto })
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.updateOrderUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un pedido' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteOrderUseCase.execute(id);
  }
}
