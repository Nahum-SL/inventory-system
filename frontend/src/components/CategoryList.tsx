"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Category } from "../types/category";
import { deleteCategory } from "../actions/category";

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`¿Estas seguro de eliminar la categoría "${name}"?`)) return;
    setDeleting(id);
    try {
      await deleteCategory(id);
      router.refresh();
    } catch (err) {
      console.error("Error al eliminar la categoría", err);
    } finally {
      setDeleting(null);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay categorías registradas</p>
        <Link
          href="/categories/create"
          className="inline-block mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Crear Primera Categoría
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        {/* Cabezera de la tabla */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        {/* Cuerpo de la tabla */}
        <tbody className="divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {category.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {category.description || "-"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-4">
                  <Link
                    href={`/categories/edit/${category.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id, category.name)}
                    className="text-red-600 hover:text-red-900"
                    disabled={deleting === category.id}
                  >
                    {deleting === category.id ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
