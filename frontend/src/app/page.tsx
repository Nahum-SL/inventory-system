import Link from "next/link"

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center gap-4">
      <Link
        href="/products"
        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
      >
        Productos
      </Link>
      <Link
        href="/categories"
        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
      >
        Categorias
      </Link>
      <div>
        < h1 className="hover:font-bold">Este es el Home</h1>
      </div>
    </main>
  )
}