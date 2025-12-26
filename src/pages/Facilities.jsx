import Navbar from '../components/home/Navbar';
import FacilitiesShowcase from '../components/home/FacilitiesShowcase';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Footer from '../components/home/Footer';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

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
              ZIVARA
            </p>

            {/* Main Heading */}
            <h1 className="text-white text-shadow-lg text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight playfair-display">
              FACILITIES
            </h1>
            

            {/* Subtitle */}
            <p className="text-white text-shadow-lg text-base md:text-lg max-w-2xl mx-auto mt-6 font-light raleway">
              Book your stay and enjoy Luxury redefined at the most affordable
              rates.
            </p>

            {/* CTA Button */}
            <div className="pt-6">
            <button
              className="
                group relative px-10 sm:px-12 py-3 sm:py-4
                text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em]
                border border-white text-white overflow-hidden
                transition-all duration-500
              "
            >
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <Link to="/rooms"><span className="relative z-10 group-hover:text-black transition-colors duration-500">
                Book Your Stay
              </span></Link>
            </button>
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
