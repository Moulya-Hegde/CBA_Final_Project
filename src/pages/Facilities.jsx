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
        <div className="relative z-10 h-full w-full flex items-center justify-center md:justify-start">
  {/* Content Wrapper */}
  <div
    className="flex flex-col px-6 md:px-0 md:ml-[10%] lg:ml-[15%] gap-4 md:gap-6"
  >
    {/* Welcome Text */}
    <p className="text-white text-sm md:text-xl font-light tracking-[0.3em] uppercase raleway">
      ZIVARA
    </p>

    {/* Main Heading */}
    <h1 className="text-white text-shadow-lg text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight playfair-display leading-tight">
      FACILITIES
    </h1>

    {/* Subtitle */}
    <p className="text-white text-shadow-lg text-sm md:text-lg max-w-md md:max-w-2xl font-light raleway leading-relaxed">
      Book your stay and enjoy Luxury redefined at the most affordable rates.
    </p>

    {/* CTA Button */}
    <div className="pt-4 md:pt-6">
      <Link to="/rooms" className="inline-block">
        <button
          className="
            group relative px-8 md:px-12 py-3 md:py-4
            text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]
            border border-white text-white overflow-hidden
            transition-all duration-500
          "
        >
          <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          <span className="relative z-10 group-hover:text-black transition-colors duration-500">
            Book Your Stay
          </span>
        </button>
      </Link>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2">
    <button
      onClick={scrollToNext}
      className="flex flex-col items-center gap-2 text-white hover:text-[#C4A962] transition-colors duration-300 group"
      aria-label="Scroll to next section"
    >
      <span className="text-[10px] md:text-sm tracking-widest uppercase raleway">Scroll</span>
      <ChevronDown className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
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
