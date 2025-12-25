import Navbar from '../components/home/Navbar';
import FacilitiesShowcase from '../components/home/FacilitiesShowcase';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Footer from '../components/home/Footer';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Facilities = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Custom Hero Section for Facilities */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="space-y-6">
            {/* Welcome Text */}
            <p className="text-white text-lg md:text-xl font-light tracking-widest raleway">
              WELCOME TO
            </p>

            {/* Main Heading */}
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight playfair-display">
              LUXURY
            </h1>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight playfair-display -mt-4">
              HOTELS
            </h1>

            {/* Subtitle */}
            <p className="text-white text-base md:text-lg max-w-2xl mx-auto mt-6 font-light raleway">
              Book your stay and enjoy Luxury redefined at the most affordable
              rates.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-[#C4A962] hover:bg-[#B39952] text-white font-semibold px-8 py-6 text-base tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">📅</span> BOOK NOW
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <button
              onClick={scrollToNext}
              className="flex flex-col items-center gap-2 text-white hover:text-[#C4A962] transition-colors duration-300 group"
              aria-label="Scroll to next section"
            >
              <span className="text-sm tracking-widest raleway">Scroll</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      <FacilitiesShowcase />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Facilities;
