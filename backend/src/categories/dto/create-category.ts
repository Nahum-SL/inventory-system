import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatedCategoryDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser texto' })
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
