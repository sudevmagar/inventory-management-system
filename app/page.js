import Navbar from "../components/LandingPage/Navbar";
import HeroSection from "../components/LandingPage/HeroSection";
import FeaturesSection from "../components/LandingPage/FeaturesSection";
import TestimonialsSection from "../components/LandingPage/TestimonialsSection";
import Footer from "../components/LandingPage/Footer";

export default function HomePage() {
  return (
    <div className="bg-gray-100 relative flex flex-col">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}