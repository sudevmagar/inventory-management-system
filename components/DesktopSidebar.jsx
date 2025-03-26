"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Notebook } from "lucide-react";

export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:block lg:w-[280px] lg:h-full lg:bg-white lg:fixed lg:inset-y-0">
      <div className="p-6 grid grid-rows-[150px_1fr] h-full">
        <div className="text-2xl font-bold text-blue-600">IMS</div>

        <div className="flex flex-col justify-start items-start text-gray-600">
          <Link
            href="/dashboard"
            className={`w-full flex items-center mb-8 cursor-pointer hover:text-blue-600 ${
              pathname === "/dashboard" ? "text-blue-600" : ""
            }`}
          >
            <Home className="w-5 h-5 mr-5" />
            <p className="font-medium">Dashboard</p>
          </Link>
          <Link
            href="/dashboard/inventory"
            className={`w-full flex items-center mb-8 cursor-pointer hover:text-blue-600 ${
              pathname === "/dashboard/inventory" ? "text-blue-600" : ""
            }`}
          >
            <Package className="w-5 h-5 mr-5" />
            <p className="font-medium">Inventory</p>
          </Link>
          <Link
            href="/dashboard/categories"
            className={`w-full flex items-center mb-8 cursor-pointer hover:text-blue-600 ${
              pathname === "/dashboard/categories" ? "text-blue-600" : ""
            }`}
          >
            <Notebook className="w-5 h-5 mr-5" />
            <p className="font-medium">Categories</p>
          </Link>
        </div>
      </div>
    </div>
  );
}