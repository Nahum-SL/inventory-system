import { getCategory } from "@/src/actions/category";
import CategoryForm from "@/src/components/CategoryForm";

interface EditCategoryPageProps {
  params: { id: string };
}
export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;
  const category = await getCategory(parseInt(id));
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Editar Categoría</h1>
      <CategoryForm category={category} mode="edit" />
    </div>
  );
}
