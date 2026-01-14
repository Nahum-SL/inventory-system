import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  // Inyección de dependencias
  constructor(private readonly prisma: PrismaService) {}

  // Crear producto
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  // Obtener todos los productos
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Obtener un producto por ID
  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return product;
  }

  // Actualizar producto
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // Verificar que existe
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  // Eliminar producto
  async remove(id: number): Promise<Product> {
    // Verificar que existe
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
