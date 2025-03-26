"use client";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProductsList() {
  const products = [
    { name: "Laptop", quantity: 10, price: 999.99, category: "Electronics" },
    { name: "Headphones", quantity: 25, price: 199.5, category: "Electronics" },
    { name: "Desk Chair", quantity: 5, price: 249.99, category: "Furniture" },
  ];


  const handleDelete= (productId)=>{
    alert("delete clicked");
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/dashboard/inventory/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
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
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">${product.price.toFixed(2)}</td>
                <td className="p-3">{product.category}</td>
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
      </div>
    </div>
  );
}
