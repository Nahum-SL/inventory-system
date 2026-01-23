import Link from "next/link";
import { getCategories } from "@/src/actions/category";
import CategoryList from "@/src/components/CategoryList";

export default async function CategoriesPage() {
  const categories = await getCategories();
    return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <span><Link href="/" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">Inicio</Link></span>
        <h1 className="text-3xl font-bold">Gestión de Categorías</h1>
        <Link
          href="/categories/create"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Nueva Categoría
        </Link>
        </div>
        <CategoryList categories={categories} />
    </div>
  );
}