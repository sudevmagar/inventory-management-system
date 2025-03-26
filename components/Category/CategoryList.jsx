"use client";

import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      
      if (response.ok) {
        setCategories(data);
      } else {
        setError(data.error || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async (categoryId) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete category");
      }

      // Refresh the categories list after deletion
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category: " + error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto sm:p-6">
      <div className="flex justify-between flex-col sm:flex-row items-center mb-6 gap-2">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Link
          href="/dashboard/categories/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Category
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading categories...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No categories found. Create your first category!</p>
        </div>
      ) : (
        /* Categories list */
        categories.map((category, index) => (
          <div
            key={category.id || index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-2"
          >
            <div className="flex-grow w-full">
              <h3 className="text-lg font-semibold mb-1">{category.title}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href={`/dashboard/categories/edit/${category.id}`}
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
        ))
      )}
    </div>
  );
}
