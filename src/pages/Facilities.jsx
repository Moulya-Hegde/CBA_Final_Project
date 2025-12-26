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
        <div className="relative z-10 h-full">
          <div className="absolute flex flex-col px-4 sm:px-8 md:px-12 lg:px-52 top-[45%] -translate-y-1/2 md:top-52 md:translate-y-0 lg:top-72 gap-3 sm:gap-4 md:gap-5">
            {/* Welcome Text */}
            <p
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                lineHeight: '1',
                letterSpacing: '0',
                margin: 0,
                padding: 0
              }}
            >
              WELCOME TO
            </p>

            {/* Main Heading - LUXURY */}
            <h1
              className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
              style={{
                fontFamily: "'EB Garamond', 'Adobe Garamond Pro', 'Garamond', 'Georgia', serif",
                fontWeight: 700,
                lineHeight: '1',
                letterSpacing: 'clamp(2px, 1vw, 10.78px)',
                margin: 0,
                padding: 0
              }}
            >
              LUXURY
            </h1>

            {/* HOTELS */}
            <h1
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
              style={{
                fontFamily: "'EB Garamond', 'Adobe Garamond Pro', 'Garamond', 'Georgia', serif",
                fontWeight: 700,
                lineHeight: '1',
                letterSpacing: 'clamp(4px, 2vw, 24px)',
                margin: 0,
                padding: 0
              }}
            >
              HOTELS
            </h1>

            {/* Subtitle */}
            <p
              className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                lineHeight: '1.2',
                letterSpacing: 'clamp(0.5px, 0.5vw, 2.5px)',
                margin: 0,
                padding: 0
              }}
            >
              Book your stay and enjoy Luxury redefined at the most affordable rates.
            </p>
          </div>

          {/* CTA Button - Centered above Scroll */}
          <div className="absolute bottom-20 sm:bottom-24 md:bottom-32 left-1/2 transform -translate-x-1/2">
            <Button
              size="lg"
              className="bg-[#C4A962] hover:bg-[#B39952] text-white font-semibold px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              <span className="mr-2">📅</span> BOOK NOW
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 transform -translate-x-1/2">
            <button
              onClick={scrollToNext}
              className="flex flex-col items-center gap-2 text-white hover:text-[#C4A962] transition-colors duration-300 group"
              aria-label="Scroll to next section"
            >
              <span className="text-xs sm:text-sm tracking-widest raleway">Scroll</span>
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
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
