import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create-branch.dto.js';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {}
