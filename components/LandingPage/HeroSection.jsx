import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-gray-100 flex items-center h-[750px] px-4 md:min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full">
        {/* Left: Text Content */}
        <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-left">
            Simplify Your Inventory Control
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 text-left max-w-lg">
            Effortlessly manage stock, track quantities, and optimize your
            business with real-time insights.
          </p>
          <Link href="/login">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-base md:text-lg">
              Get Started
            </button>
          </Link>
        </div>

        {/* Right: Placeholder Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/assets/ims-demo.png"
            alt="IMS Dashboard Demo"
            width={500}
            height={400}
            className="rounded-lg shadow-md w-full max-w-[400px] md:max-w-[500px]"
          />
        </div>
      </div>
    </section>
  );
}