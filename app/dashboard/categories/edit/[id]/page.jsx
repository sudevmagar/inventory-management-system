"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditForm() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch category data on component mount
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`/api/categories/${categoryId}`);
        const data = await response.json();
        console.log(data);
        setFormData({
          title: data.title,
          description: data.description,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching category data:", error);
        setIsLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update category");

      // Redirect back to categories page after successful update
      router.push("/dashboard/categories");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <p className="text-center">Loading categories data...</p>
      </div>
    );
  }

  return (
<div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Category</h1>
          <button 
            onClick={() => router.push("/dashboard/categories")}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter category title"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter short description"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Update Category
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/categories")}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
