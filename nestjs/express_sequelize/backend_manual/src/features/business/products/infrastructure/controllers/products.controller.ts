import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../../application/dto/create-product.dto.js';
import { UpdateProductDto } from '../../application/dto/update-product.dto.js';
import { ProductFilterDto } from '../../application/dto/product-filter.dto.js';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case.js';
import { GetProductUseCase } from '../../application/use-cases/get-product.use-case.js';
import { ListProductsUseCase } from '../../application/use-cases/list-products.use-case.js';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.use-case.js';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.use-case.js';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly getProduct: GetProductUseCase,
    private readonly listProducts: ListProductsUseCase,
    private readonly updateProduct: UpdateProductUseCase,
    private readonly deleteProduct: DeleteProductUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.createProduct.execute(dto);
  }

  @Get()
  async list(@Query() filter: ProductFilterDto) {
    return this.listProducts.execute(filter);
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.getProduct.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.updateProduct.execute(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.deleteProduct.execute(id);
  }
}
