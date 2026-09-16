import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDetailDto } from './create-order-detail.dto.js';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {}
