"use client";

import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function ProductsList() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setProducts(data);
      } else {
        console.error("Failed to fetch products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete product");
      }
      
      // Refresh the products list after deletion
      fetchProducts();
      
      // Refresh the page using Next.js router
      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error); // Fixed variable name from err to error
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-xl">
      <div className="flex justify-start sm:justify-between flex-col sm:flex-row sm:items-center mb-6 gap-2">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/dashboard/inventory/create"
          className="bg-blue-500 text-white px-4 py-2 w-fit rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        {loading ? (
          <div className="text-center py-4">Loading products...</div>
        ) : products && products.length > 0 ? (
          <table className="w-full border-collapse">
            {/* Desktop/Large Screen Header */}
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="p-3">{product.title}</td>
                  <td className="p-3">{product.quantity}</td>
                  <td className="p-3">${product.price.toFixed(2)}</td>
                  <td className="p-3">{product.category.title}</td>
                  <td className="p-3 flex items-center space-x-2">
                    <Link
                      href={`/dashboard/inventory/edit/${product.id}`}
                      className="text-blue-500 hover:text-blue-700"
                      aria-label="Edit product"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete product"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4">No products found.</div>
        )}
      </div>
    </div>
  );
}
