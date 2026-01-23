import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  // Inyección de dependencias
  constructor(private readonly prisma: PrismaService) {}

  // Crear producto
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  // Obtener todos los productos
  findAll() {
    return this.prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Obtener un producto por ID
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return product;
  }

  // Actualizar producto
  async update(id: number, updateProductDto: UpdateProductDto) {
    // Verificar que existe
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  // Eliminar producto
  async remove(id: number) {
    // Verificar que existe
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
