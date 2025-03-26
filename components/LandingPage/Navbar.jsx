import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center absolute top-0 left-0 right-0 z-10">
      <div className="text-2xl font-bold text-blue-600">IMS</div>
      <Link href="/login">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Login
        </button>
      </Link>
    </nav>
  );
}