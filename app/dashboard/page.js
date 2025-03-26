"use client";
import { Package, Banknote, Warehouse, NotebookIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState();
  const [Loading, setLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/stats");

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard statistics");
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [setStats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="bg-white p-8 rounded-lg">
      <div className="mb-11">
        <h1 className="text-3xl font-semibold">Overview</h1>
      </div>
      <div className="grid grid-cols-1 gap-16 mt-11 w-full sm:grid-cols-2 lg:grid-cols-4 lg:overflow-auto">
        <div className="flex flex-col items-center justify-center mr-5">
          <Package className="w-9 h-9 text-gray-600" />
          <p className="mt-4 text-2xl font-medium">
            {stats?.totalProducts || "0"}
          </p>
          <p className="text-center w-40">Number of Products</p>
        </div>
        <div className="flex flex-col items-center justify-center mr-5">
          <Warehouse className="w-9 h-9 text-gray-600" />
          <p className="mt-4 text-2xl font-medium">
            {stats?.totalQuantity || "0"}
          </p>
          <p className="text-center w-40">Total Quantity</p>
        </div>
        <div className="flex flex-col items-center justify-center mr-5">
          <Banknote className="w-9 h-9 text-gray-600" />
          <p className="mt-4 text-2xl font-medium">
            ${Math.round(stats?.totalPrice*100)/100|| "0"}
          </p>
          <p className="text-center w-40">Total Value in Hand</p>
        </div>
        <div className="flex flex-col items-center justify-center mr-5">
          <NotebookIcon className="w-9 h-9 text-gray-600" />
          <p className="mt-4 text-2xl font-medium">
            {stats?.totalCategories || "0"}
          </p>
          <p className="text-center w-40">Total Categories</p>
        </div>
      </div>
    </div>
  );
}
