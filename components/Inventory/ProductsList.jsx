"use client";
import Link from "next/link";
import React from "react";

export default function ProductsList() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/dashboard/inventory/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="w-full">
      </div>
    </div>
  );
}
