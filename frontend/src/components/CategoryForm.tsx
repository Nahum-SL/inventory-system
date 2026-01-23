"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category, CreateCategoryInput } from "../types/category";
import { createCategory, updateCategory } from "../actions/category";

interface CategoryFormProps {
  category?: Category;
  mode: "create" | "edit";
}
export default function CategoryForm({ category, mode }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateCategoryInput>({
    name: category?.name || "",
    description: category?.description || "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "create") {
        await createCategory(formData);
      } else if (category) {
        await updateCategory(category.id, formData);
      }
      router.push("/categories");
      router.refresh(); // Refresca la pagina para mostrar los cambios
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* Error al obtener la categoría */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="name"
        >
          Nombre de la Categoría
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="description"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading
            ? "Guardando..."
            : mode === "create"
              ? "Crear Categoría"
              : "Actualizar Categoría"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
        >
          Cancelar
        </button>

      </div>
    </form>
  );
}
