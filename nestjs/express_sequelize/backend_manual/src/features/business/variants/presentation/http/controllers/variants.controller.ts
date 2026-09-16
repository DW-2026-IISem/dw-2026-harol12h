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
import { CreateVariantDto } from '../../../application/dto/create-variant.dto.js';
import { UpdateVariantDto } from '../../../application/dto/update-variant.dto.js';
import { VariantFilterDto } from '../../../application/dto/variant-filter.dto.js';
import { VariantResponseDto } from '../../../application/dto/variant-response.dto.js';
import { CreateVariantUseCase } from '../../../application/use-cases/create-variant.use-case.js';
import { UpdateVariantUseCase } from '../../../application/use-cases/update-variant.use-case.js';
import { DeleteVariantUseCase } from '../../../application/use-cases/delete-variant.use-case.js';
import { GetVariantUseCase } from '../../../application/use-cases/get-variant.use-case.js';
import { ListVariantsUseCase } from '../../../application/use-cases/list-variants.use-case.js';

@ApiTags('Variants')
@Controller('variants')
export class VariantsController {
  constructor(
    private readonly createVariantUseCase: CreateVariantUseCase,
    private readonly updateVariantUseCase: UpdateVariantUseCase,
    private readonly deleteVariantUseCase: DeleteVariantUseCase,
    private readonly getVariantUseCase: GetVariantUseCase,
    private readonly listVariantsUseCase: ListVariantsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una variante' })
  @ApiCreatedResponse({ type: VariantResponseDto })
  create(@Body() dto: CreateVariantDto) {
    return this.createVariantUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar variantes' })
  @ApiOkResponse({ type: [VariantResponseDto] })
  findAll(@Query() filter: VariantFilterDto) {
    return this.listVariantsUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una variante por ID' })
  @ApiOkResponse({ type: VariantResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getVariantUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una variante' })
  @ApiOkResponse({ type: VariantResponseDto })
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: UpdateVariantDto,
  ) {
    return this.updateVariantUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una variante' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteVariantUseCase.execute(id);
  }
}
