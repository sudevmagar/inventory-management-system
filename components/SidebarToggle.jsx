"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Tag, Menu } from "lucide-react";

export default function SidebarToggle() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-[250px] bg-white shadow-2xl z-20 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="p-6 grid grid-rows-[150px_1fr] h-full">
          <div className="text-2xl font-bold text-blue-600">IMS</div>

          <div className="flex flex-col justify-start items-start text-gray-600">
            <Link
              href="/dashboard"
              className={`w-full flex items-center mb-8 cursor-pointer hover:text-blue-600 ${
                pathname === "/dashboard" ? "text-blue-600" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Home className="w-5 h-5 mr-5" />
              <p className="font-medium">Dashboard</p>
            </Link>
            <Link
              href="/dashboard/inventory"
              className={`w-full flex items-center mb-8 cursor-pointer hover:text-blue-600 ${
                pathname === "/dashboard/inventory" ? "text-blue-600" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Package className="w-5 h-5 mr-5" />
              <p className="font-medium">Inventory</p>
            </Link>
            <Link
              href="/dashboard/categories"
              className={`w-full flex items-center mb-8 cursor-pointer hover:text-blue-600 ${
                pathname === "/dashboard/categories" ? "text-blue-600" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Tag className="w-5 h-5 mr-5" />
              <p className="font-medium">Categories</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 lg:hidden"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Burger Menu Button */}
      <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
        <Menu className="w-[50px] h-[50px] p-2.5 cursor-pointer" />
      </button>
    </>
  );
}