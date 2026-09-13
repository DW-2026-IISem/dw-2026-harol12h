import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionDto } from './create-collection.dto.js';

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {}
