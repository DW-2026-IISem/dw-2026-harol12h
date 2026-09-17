import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { CreateReturnDetailUseCase } from '../../../application/use-cases/create-return-detail.usecase.js';
import { UpdateReturnDetailUseCase } from '../../../application/use-cases/update-return-detail.usecase.js';
import { DeleteReturnDetailUseCase } from '../../../application/use-cases/delete-return-detail.usecase.js';
import { FindReturnDetailUseCase } from '../../../application/use-cases/find-return-detail.use-case.js';
import { ListReturnDetailsUseCase } from '../../../application/use-cases/list-return-details.usecase.js';
import { CreateReturnDetailDto } from '../../../application/dto/create-return-detail.dto.js';
import { UpdateReturnDetailDto } from '../../../application/dto/update-return-detail.dto.js';

@Controller('return-details')
export class ReturnDetailsController {
  constructor(
    private readonly createDetail: CreateReturnDetailUseCase,
    private readonly updateDetail: UpdateReturnDetailUseCase,
    private readonly deleteDetail: DeleteReturnDetailUseCase,
    private readonly findDetail: FindReturnDetailUseCase,
    private readonly listDetails: ListReturnDetailsUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateReturnDetailDto) {
    return this.createDetail.execute(dto);
  }

  @Get()
  async list() {
    return this.listDetails.execute({});
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    return this.findDetail.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateReturnDetailDto) {
    const detail = { id, ...dto } as any;
    return this.updateDetail.execute(detail);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.deleteDetail.execute(id);
  }
}
