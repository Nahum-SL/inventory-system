import CategoryForm from "@/src/components/CategoryForm";

export default function CreateCategoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Crear Nueva Categoría</h1>
      <CategoryForm mode="create" />
    </div>
  );
}