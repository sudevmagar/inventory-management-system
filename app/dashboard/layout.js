import Link from "next/link";
import SidebarToggle from "@/components/Dashboard/SidebarToggle";
import DesktopSidebar from "@/components/Dashboard/DesktopSidebar";
import { Search } from "lucide-react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

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