import Navbar from '../components/home/Navbar';
import HeroSection from '../components/home/HeroSection';
import IntroSection from '../components/home/IntroSection';
import LocationsCarousel from '../components/home/LocationsCarousel';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <IntroSection />
      <LocationsCarousel />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Home;
