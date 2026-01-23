import { getProduct } from "@/src/actions/product";
import ProductForm from "@/src/components/ProductForm";

interface EditProductPageProps {
  params: { id: string };
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const product = await getProduct(parseInt(id));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Editar Producto</h1>
      <ProductForm product={product} mode="edit" />
    </div>
  );
}
