import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-inventory.dto.js';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {}
