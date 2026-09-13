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
import { CreateCollectionDto } from '../../../application/dto/create-collection.dto.js';
import { UpdateCollectionDto } from '../../../application/dto/update-collection.dto.js';
import { CollectionFilterDto } from '../../../application/dto/collection-filter.dto.js';
import { CollectionResponseDto } from '../../../application/dto/collection-response.dto.js';
import { CreateCollectionUseCase } from '../../../application/use-cases/create-collection.use-case.js';
import { UpdateCollectionUseCase } from '../../../application/use-cases/update-collection.use-case.js';
import { DeleteCollectionUseCase } from '../../../application/use-cases/delete-collection.use-case.js';
import { GetCollectionUseCase } from '../../../application/use-cases/get-collection.use-case.js';
import { ListCollectionsUseCase } from '../../../application/use-cases/list-collections.use-case.js';

@ApiTags('Collections')
@Controller('collections')
export class CollectionsController {
  constructor(
    private readonly createCollectionUseCase: CreateCollectionUseCase,
    private readonly updateCollectionUseCase: UpdateCollectionUseCase,
    private readonly deleteCollectionUseCase: DeleteCollectionUseCase,
    private readonly getCollectionUseCase: GetCollectionUseCase,
    private readonly listCollectionsUseCase: ListCollectionsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una colección' })
  @ApiCreatedResponse({ type: CollectionResponseDto })
  create(@Body() dto: CreateCollectionDto) {
    return this.createCollectionUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar colecciones' })
  @ApiOkResponse({ type: [CollectionResponseDto] })
  findAll(@Query() filter: CollectionFilterDto) {
    return this.listCollectionsUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una colección por ID' })
  @ApiOkResponse({ type: CollectionResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getCollectionUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una colección' })
  @ApiOkResponse({ type: CollectionResponseDto })
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: UpdateCollectionDto,
  ) {
    return this.updateCollectionUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una colección' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteCollectionUseCase.execute(id);
  }
}
