import { Package, Banknote, Warehouse, NotebookIcon } from "lucide-react";

const Storage = {
  getProducts: () => [
    { id: 1, quantity: 500, price: 1000 },
    { id: 2, quantity: 368, price: 434 },
  ],
  getCategories: () => [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
  ],
};

export default function DashboardPage() {
  const calculateProducts = () => {
    const allProducts = Storage.getProducts();
    return allProducts.length.toLocaleString();
  };

  const calculateQuantity = () => {
    const allProducts = Storage.getProducts();
    return allProducts
      .reduce((acc, product) => acc + product.quantity, 0)
      .toLocaleString();
  };

  const calculatePrice = () => {
    const allProducts = Storage.getProducts();
    const totalPrice = allProducts.reduce(
      (acc, product) => acc + product.price,
      0
    );
    return totalPrice.toLocaleString();
  };

  const totalCategories = () => {
    const allCategories = Storage.getCategories();
    return allCategories.length.toLocaleString();
  };

  return (
    <div className="bg-white p-8 rounded-lg">
      {/* Header */}
      <div className="mb-11">
        <h1 className="text-3xl font-semibold">Overview</h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-16 mt-11 w-full sm:grid-cols-2 lg:grid-cols-4 lg:overflow-auto">
        {/* Number of Products */}
        <div className="flex flex-col items-center justify-center mr-5">
          <Package className="w-9 h-9 text-gray-600" />
          <p className="mt-4 text-2xl font-medium">{calculateProducts()}</p>
          <p className="text-center w-40">Number of Products</p>
        </div>

        {/* Total Quantity */}
        <div className="flex flex-col items-center justify-center mr-5">
          <Warehouse className="w-9 h-9 text-gray-600" />
          <p className="mt-4 text-2xl font-medium">{calculateQuantity()}</p>
          <p className="text-center w-40">Total Quantity</p>
        </div>

        {/* Total Value in Hand */}
        <div className="flex flex-col items-center justify-center mr-5">
          <Banknote className="w-9 h-9 text-gray-600" />
          <p className="mt-4 text-2xl font-medium">${calculatePrice()}</p>
          <p className="text-center w-40">Total Value in Hand</p>
        </div>

        {/* Total Categories */}
        <div className="flex flex-col items-center justify-center mr-5">
          <NotebookIcon className="w-9 h-9 text-gray-600" />
          <p className="mt-4 text-2xl font-medium">{totalCategories()}</p>
          <p className="text-center w-40">Total Categories</p>
        </div>
      </div>
    </div>
  );
}