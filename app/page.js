import Navbar from "../components/LandingPage/Navbar";
import HeroSection from "../components/LandingPage/HeroSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 relative flex flex-col">
      <Navbar />
      <HeroSection />
    </div>
  );
}