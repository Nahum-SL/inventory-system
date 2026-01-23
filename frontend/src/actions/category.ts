"use server";

import {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/src/types/category";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Obtener todas las categorias
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`, {
    cache: "no-store", // No cachear para datos en tiempo real
  });

  if (!response.ok) {
    throw new Error("Error al obtener las categorias");
  }

  return response.json();
}

// Obtener una categoria por ID
export async function getCategory(id: number): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    cache: "no-store",
  });
  
  if (!response.ok) {
    throw new Error("Categoria no encontrada");
  }
  
  return response.json();
}

// Crear una categoria
export async function createCategory(
  data: CreateCategoryInput,
): Promise<Category> {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al crear la categoria");
  }

  const category = await response.json();

  // Revalidar la pagina de categorias para mostrar la nueva categoria
  revalidatePath("/categories");

  return category;
}

// Actualizar una categoria
export async function updateCategory(
  id: number,
  data: UpdateCategoryInput,
): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al actualizar la categoria");
  }

  const category = await response.json();

  // revalidar la pagina de categorias para mostrar los cambios
  revalidatePath("/categories");
  revalidatePath(`/categories/${id}`);

  return category;
}

// Eliminar una categoria
export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al eliminar la categoria");
  }
  
  revalidatePath("/categories");
}