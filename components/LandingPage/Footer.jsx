import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold text-blue-400 mb-4">IMS</h3>
          <p className="text-gray-300 text-center md:text-left">
            Simplify your inventory management with real-time insights and
            automation.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300 text-center md:text-left">
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/features" className="hover:text-blue-400 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="w-6 h-6 text-gray-300 hover:text-blue-400 transition-colors" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="w-6 h-6 text-gray-300 hover:text-blue-400 transition-colors" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-6 h-6 text-gray-300 hover:text-blue-400 transition-colors" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="w-6 h-6 text-gray-300 hover:text-blue-400 transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} IMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}