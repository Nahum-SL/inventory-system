export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateProductInput extends Partial<CreateProductInput> {}
