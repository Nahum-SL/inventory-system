import Link from "next/link";
import { getProducts } from "@/src/actions/product";
import ProductList from "@/src/components/ProductList";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <span><Link href="/" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">Inicio</Link></span>
        <h1 className="text-3xl font-bold">Inventario de Productos</h1>
        <Link
          href="/products/create"
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Nuevo Producto
        </Link>
      </div>
      <ProductList products={products} />
    </div>
  );
}
