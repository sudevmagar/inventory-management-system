"use client";
import Link from "next/link";
import React from "react";

export default function ProductsList() {
  return (
    <div className="">
      <div className="">
        <h1>Products</h1>
        <div>
          <Link href={"/dashboard/inventory/create"}>Add Product</Link>
        </div>
      </div>
    </div>
  );
}
