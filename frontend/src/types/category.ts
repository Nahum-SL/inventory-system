export interface Category {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {}