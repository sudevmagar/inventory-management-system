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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Category</h1>
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
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium">
            Description
          </label>
          <input
            type="textarea"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter short description"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2 flex-col sm:flex-row text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Update Category
          </button>
          <Link
            href="/dashboard/categories"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
