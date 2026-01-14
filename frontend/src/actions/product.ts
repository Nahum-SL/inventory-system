"use server";

import {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from "@/src/types/product";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Obtener todos los productos
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`, {
    cache: "no-store", // No cachear para datos en tiempo real
  });

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }

  return response.json();
}

// Obtener un producto por ID
export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Producto no encontrado");
  }

  return response.json();
}

// Crear un producto
export async function createProduct(
  data: CreateProductInput
): Promise<Product> {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al crear el producto");
  }

  const product = await response.json();

  // Revalidar la pagina de productos para mostrar el nuevo producto
  revalidatePath("/products");

  return product;
}

export async function updateProduct(
  id: number,
  data: UpdateProductInput
): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al actualizar el producto');
  }

  const product = await response.json();
  revalidatePath('/products');
  revalidatePath(`/products/${id}`);

  return product;
}

// Eliminar un producto
export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el producto');
  }

  revalidatePath('/products');
}
