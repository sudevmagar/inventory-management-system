"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoryForm() {
  const router =useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  
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
      const response = await fetch(`/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create category");

      setFormData({
        title: "",
        description: ""
      })
      // Redirect back to categories page after successful update
      router.push("/dashboard/categories");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add New Category</h1>
          <button 
            onClick={()=> router.push('/dashboard/categories')}
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
              rows="3"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2 flex-col sm:flex-row text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Category
            </button>
            <button
              type="button"
              onClick={()=> router.push('/dashboard/categories')}
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
