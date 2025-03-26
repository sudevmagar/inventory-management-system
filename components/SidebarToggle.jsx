// components/SidebarToggle.jsx
"use client";
import { useState } from "react";
import { Home, Package, Tag, Menu } from "lucide-react";

export default function SidebarToggle() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <div className="w-full flex items-center mb-8 cursor-pointer text-blue-600">
              <Home className="w-5 h-5 mr-5" />
              <p className="font-medium">Dashboard</p>
            </div>
            <div className="w-full flex items-center mb-8 cursor-pointer hover:text-blue-600">
              <Package className="w-5 h-5 mr-5" />
              <p className="font-medium"> BCS Inventory</p>
            </div>
            <div className="w-full flex items-center mb-8 cursor-pointer hover:text-blue-600">
              <Tag className="w-5 h-5 mr-5" />
              <p className="font-medium">Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Backdrop with RGBA */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 lg:hidden"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }} // 15% opacity black
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