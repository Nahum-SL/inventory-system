"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/src/types/product";
import { deleteProduct } from "@/src/actions/product";
interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`¿Estas seguro de eliminar "${name}"?`)) return;

    setDeleting(id);
    try {
      await deleteProduct(id);
      router.refresh();
    } catch (err) {
      console.error("Error al eliminar el producto", err);
    } finally {
      setDeleting(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay productos registrados</p>
        <Link
          href="/products/create"
          className="inline-block mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Crear Primer Producto
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
              Producto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              {/* Nombre y descripcion */}
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {product.name}
                </div>
                {product.description && (
                  <div className="text-sm text-gray-500">
                    {product.description}
                  </div>
                )}
              </td>

              {/* Precio */}
              <td className="px-6 py-4 text-sm text-gray-900">
                ${parseFloat(product.price.toString()).toFixed(2)}
              </td>

              {/* Stock */}
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.stock > 10
                      ? "bg-green-100 text-green-800"
                      : product.stock > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.stock} Unidades
                </span>
              </td>

              <td className="px-6 py-4">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {product.category?.name || 'Sin categoria' }
                </span>
              </td>

              <td className="px-6 py-4 text-sm font-medium space-x-2">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(product.id, product.name)}
                  disabled={deleting === product.id}
                  className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                >
                  {deleting === product.id ? "Eliminando..." : "Eliminar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
