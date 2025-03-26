"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function CategoryForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [categories, setCategories] = useState(["No Category"]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    setFormData({
      title: "",
      description: "",
    });
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="product" className="block mb-2 text-sm font-medium">
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
            Add Category
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
