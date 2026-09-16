import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { CreateReturnUseCase } from '../../../application/use-cases/create-return.usecase.js';
import { UpdateReturnUseCase } from '../../../application/use-cases/update-return.usecase.js';
import { DeleteReturnUseCase } from '../../../application/use-cases/delete-return.usecase.js';
import { FindReturnUseCase } from '../../../application/use-cases/find-return.usecase.js';
import { ListReturnsUseCase } from '../../../application/use-cases/list-returns.usecase.js';
import { CreateReturnDto } from '../../../application/dto/create-return.dto.js';
import { UpdateReturnDto } from '../../../application/dto/update-return.dto.js';

@Controller('returns')
export class ReturnsController {
  constructor(
    private readonly createReturn: CreateReturnUseCase,
    private readonly updateReturn: UpdateReturnUseCase,
    private readonly deleteReturn: DeleteReturnUseCase,
    private readonly findReturn: FindReturnUseCase,
    private readonly listReturns: ListReturnsUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateReturnDto) {
    return this.createReturn.execute(dto);
  }

  @Get()
  async list() {
    return this.listReturns.execute({});
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    return this.findReturn.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateReturnDto) {
    const returnEntity = { id, ...dto } as any;
    return this.updateReturn.execute(returnEntity);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.deleteReturn.execute(id);
  }
}
