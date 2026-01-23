import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreatedCategoryDto } from './dto/create-category';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

@Controller('categories') // Ruta base: /categories
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // POST /categories
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createdCategoryDto: CreatedCategoryDto) {
    return this.categoriesService.create(createdCategoryDto) as unknown;
  }

  // GET /categories
  @Get()
  findAll() {
    return this.categoriesService.findAll() as unknown;
  }

  // GET /categories/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.categoriesService.update(id, updateProductDto);
  }

  // DELETE /categories/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
