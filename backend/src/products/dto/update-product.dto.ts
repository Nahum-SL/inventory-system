import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// PartialType hace todos los campos opcionales
export class UpdateProductDto extends PartialType(CreateProductDto) {}
