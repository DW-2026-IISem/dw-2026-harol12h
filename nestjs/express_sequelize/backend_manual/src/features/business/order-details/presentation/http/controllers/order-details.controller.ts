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
import { ParsePositiveIntPipe } from '../../../../../../common/pipes/parse-positive-int.pipe.js';
import { CreateOrderDetailUseCase } from '../../../application/use-cases/create-order-detail.use-case.js';
import { UpdateOrderDetailUseCase } from '../../../application/use-cases/update-order-detail.use-case.js';
import { DeleteOrderDetailUseCase } from '../../../application/use-cases/delete-order-detail.use-case.js';
import { GetOrderDetailUseCase } from '../../../application/use-cases/get-order-detail.use-case.js';
import { ListOrderDetailsUseCase } from '../../../application/use-cases/list-order-details.use-case.js';

@ApiTags('OrderDetails')
@Controller('order-details')
export class OrderDetailsController {
  constructor(
    private readonly createOrderDetailUseCase: CreateOrderDetailUseCase,
    private readonly updateOrderDetailUseCase: UpdateOrderDetailUseCase,
    private readonly deleteOrderDetailUseCase: DeleteOrderDetailUseCase,
    private readonly getOrderDetailUseCase: GetOrderDetailUseCase,
    private readonly listOrderDetailsUseCase: ListOrderDetailsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear detalle de pedido' })
  @ApiCreatedResponse()
  create(@Body() dto: { orderId: number; productId: number; quantity: number; unitPrice: number }) {
    return this.createOrderDetailUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar detalles de pedido' })
  @ApiOkResponse()
  findAll(@Query() filter: { orderId?: number; page?: number; limit?: number }) {
    return this.listOrderDetailsUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de pedido por ID' })
  @ApiOkResponse()
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getOrderDetailUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar detalle de pedido' })
  @ApiOkResponse()
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: Partial<{ quantity: number; unitPrice: number }>,
  ) {
    return this.updateOrderDetailUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar detalle de pedido' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteOrderDetailUseCase.execute(id);
  }
}
