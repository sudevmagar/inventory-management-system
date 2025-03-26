import { Package, Banknote, Warehouse, NotebookIcon } from "lucide-react";

async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function DashboardPage() {
  const products = await getProducts();
  const categories = await getCategories();

  const calculateProducts = () => products.length.toLocaleString();
  const calculateQuantity = () =>
    products
      .reduce((acc, product) => acc + product.quantity, 0)
      .toLocaleString();
  const calculatePrice = () =>
    products.reduce((acc, product) => acc + product.price, 0).toLocaleString();
  const totalCategories = () => categories.length.toLocaleString();

  return (
    <div className="bg-white p-8 rounded-lg">
      <div className="mb-11">
        <h1 className="text-3xl font-semibold">Overview</h1>
      </div>
      <div className="grid grid-cols-1 gap-16 mt-11 w-full sm:grid-cols-2 lg:grid-cols-4 lg:overflow-auto">
        <div className="flex flex-col items-center justify-center mr-5">
          <Package className="w-9 h-9 text-gray-600" />
          <p className="mt-4 text-2xl font-medium">{calculateProducts()}</p>
          <p className="text-center w-40">Number of Products</p>
        </div>
        <div className="flex flex-col items-center justify-center mr-5">
          <Warehouse className="w-9 h-9 text-gray-600" />
          <p className="mt-4 text-2xl font-medium">{calculateQuantity()}</p>
          <p className="text-center w-40">Total Quantity</p>
        </div>
        <div className="flex flex-col items-center justify-center mr-5">
          <Banknote className="w-9 h-9 text-gray-600" />
          <p className="mt-4 text-2xl font-medium">${calculatePrice()}</p>
          <p className="text-center w-40">Total Value in Hand</p>
        </div>
        <div className="flex flex-col items-center justify-center mr-5">
          <NotebookIcon className="w-9 h-9 text-gray-600" />
          <p className="mt-4 text-2xl font-medium">{totalCategories()}</p>
          <p className="text-center w-40">Total Categories</p>
        </div>
      </div>
    </div>
  );
}
