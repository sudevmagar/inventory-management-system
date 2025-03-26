"use client";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CategoryList() {
  const categories = [
    {
      id: 1,
      title: "Electronics",
      details: "Computers, phones, and tech accessories",
      totalProducts: 45,
      createdAt: "2024-03-15",
    },
    {
      id: 2,
      title: "Home & Kitchen",
      details: "Furniture, appliances, and home decor",
      totalProducts: 32,
      createdAt: "2024-02-22",
    },
    {
      id: 3,
      title: "Clothing",
      details: "Apparel for men, women, and children",
      totalProducts: 67,
      createdAt: "2024-01-10",
    },
    {
      id: 4,
      title: "Books",
      details: "Fiction, non-fiction, and educational books",
      totalProducts: 23,
      createdAt: "2024-03-01",
    },
    {
      id: 5,
      title: "Sports & Outdoors",
      details: "Fitness equipment, camping gear, and athletic wear",
      totalProducts: 38,
      createdAt: "2024-02-05",
    },
  ];
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Link
          href="/dashboard/categories/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Category
        </Link>
      </div>

      {/* items */}
      {categories.map((category, index) => (
        <div
        key={index} 
        className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-2">
          <div className="flex-grow w-full">
            <h3 className="text-lg font-semibold mb-1">{category.title}</h3>
            <p className="text-gray-600 text-sm">{category.details}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href={`/dashboard/category/edit/${category.id}`}
              className="text-blue-500 hover:text-blue-700 transition-colors"
              aria-label="Edit category"
            >
              <Edit size={20} />
            </Link>
            <button
              onClick={() => handleDelete(category.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label="Delete category"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
