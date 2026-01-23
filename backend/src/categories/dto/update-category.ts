import { PartialType } from '@nestjs/mapped-types';
import { CreatedCategoryDto } from './create-category';

export class UpdateCategoryDto extends PartialType(CreatedCategoryDto) {}
