import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatedCategoryDto } from './dto/create-category';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

@Injectable()
export class CategoriesService {
  // Inyección de dependencias
  constructor(private readonly prisma: PrismaService) {}

  create(createdCategoryDto: CreatedCategoryDto) {
    return this.prisma.category.create({
      data: createdCategoryDto,
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return category;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // verificar si existe
    await this.findOne(id);
    return this.prisma.category.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    // verificar si existe
    await this.findOne(id);
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
