import { Category } from "./category";
export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  categoryId: number | null;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateProductInput extends Partial<CreateProductInput> {}
