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
import { CreateInventoryDto } from '../../../application/dto/create-inventory.dto.js';
import { UpdateInventoryDto } from '../../../application/dto/update-inventory.dto.js';
import { InventoryFilterDto } from '../../../application/dto/inventory-filter.dto.js';
import { InventoryResponseDto } from '../../../application/dto/inventory-response.dto.js';
import { CreateInventoryUseCase } from '../../../application/use-cases/create-inventory.use-case.js';
import { UpdateInventoryUseCase } from '../../../application/use-cases/update-inventory.use-case.js';
import { DeleteInventoryUseCase } from '../../../application/use-cases/delete-inventory.use-case.js';
import { GetInventoryUseCase } from '../../../application/use-cases/get-inventory.use-case.js';
import { ListInventoryUseCase } from '../../../application/use-cases/list-inventory.use-case.js';

@ApiTags('Inventory')
@Controller('api/inventory')
export class InventoryController {
  constructor(
    private readonly createInventoryUseCase: CreateInventoryUseCase,
    private readonly updateInventoryUseCase: UpdateInventoryUseCase,
    private readonly deleteInventoryUseCase: DeleteInventoryUseCase,
    private readonly getInventoryUseCase: GetInventoryUseCase,
    private readonly listInventoryUseCase: ListInventoryUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear inventario' })
  @ApiCreatedResponse({ type: InventoryResponseDto })
  create(@Body() dto: CreateInventoryDto) {
    return this.createInventoryUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar inventario' })
  @ApiOkResponse({ type: [InventoryResponseDto] })
  findAll(@Query() filter: InventoryFilterDto) {
    return this.listInventoryUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener inventario por ID' })
  @ApiOkResponse({ type: InventoryResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getInventoryUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar inventario' })
  @ApiOkResponse({ type: InventoryResponseDto })
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: UpdateInventoryDto,
  ) {
    return this.updateInventoryUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar inventario' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteInventoryUseCase.execute(id);
  }
}
