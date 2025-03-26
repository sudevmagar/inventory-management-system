import Link from "next/link";
import SidebarToggle from "../../components/SidebarToggle";
import { Home, Package, Tag, Search } from "lucide-react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-[280px] lg:h-full lg:bg-white lg:fixed lg:inset-y-0">
        <div className="p-6 grid grid-rows-[150px_1fr] h-full">
          <div className="text-2xl font-bold text-blue-600">IMS</div>

          <div className="flex flex-col justify-start items-start text-gray-600">
            <div className="w-full flex items-center mb-8 cursor-pointer text-blue-600">
              <Home className="w-5 h-5 mr-5" />
              <p className="font-medium">Dashboard</p>
            </div>
            <div className="w-full flex items-center mb-8 cursor-pointer hover:text-blue-600">
              <Package className="w-5 h-5 mr-5" />
              <Link href={'/dashboard/inventory'} className="font-medium">Inventory</Link>
            </div>
            <div className="w-full flex items-center mb-8 cursor-pointer hover:text-blue-600">
              <Tag className="w-5 h-5 mr-5" />
              <p className="font-medium">Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-white h-[100px] flex items-center justify-center p-8 shadow-lg lg:shadow-none z-10 lg:ml-[280px]">
        <form className="w-full flex justify-start items-center">
          <div className="w-[230px] sm:w-[250px] flex items-center border border-gray-300 rounded-lg">
            <Search className="w-[50px] h-[50px] p-2.5" />
            <input
              type="text"
              placeholder="Search product"
              className="h-full w-full p-4 border-0 rounded-lg outline-none"
            />
          </div>
        </form>
        <SidebarToggle />
      </header>

      {/* Main Content */}
      <main className="lg:ml-[280px] p-8">{children}</main>
    </div>
  );
}
