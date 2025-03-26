"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CreateForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    price: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

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
    console.log("FormData:", formData);
    try {
      const response = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create product");

      setFormData({
        title: "",
        quantity: "",
        price: "",
        category: "",
      });
      // Redirect back to inventory page after successful update
      router.push("/dashboard/inventory");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="product" className="block mb-2 text-sm font-medium">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            min="0"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-2 text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option key="default" value="">
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 flex-col sm:flex-row text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Product
          </button>
          <Link
            href="/dashboard/inventory"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
