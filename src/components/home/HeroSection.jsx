import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <div
          className="absolute flex flex-col"
          style={{
            top: '280px',
            left: '213px',
            gap: '14px'
          }}
        >
          {/* Welcome Text */}
          <p
            className="text-white"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: '50px',
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
            className="text-white"
            style={{
              fontFamily: "'EB Garamond', 'Adobe Garamond Pro', 'Garamond', 'Georgia', serif",
              fontWeight: 700,
              fontSize: '154px',
              lineHeight: '1',
              letterSpacing: '10.78px',
              margin: 0,
              padding: 0
            }}
          >
            LUXURY
          </h1>

          {/* HOTELS */}
          <h1
            className="text-white"
            style={{
              fontFamily: "'EB Garamond', 'Adobe Garamond Pro', 'Garamond', 'Georgia', serif",
              fontWeight: 700,
              fontSize: '60px',
              lineHeight: '1',
              letterSpacing: '24px',
              margin: 0,
              padding: 0
            }}
          >
            HOTELS
          </h1>

          {/* Subtitle */}
          <p
            className="text-white"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: '25px',
              lineHeight: '1.2',
              letterSpacing: '2.5px',
              width: '575px',
              margin: 0,
              padding: 0
            }}
          >
            Book your stay and enjoy Luxury redefined at the most affordable rates.
          </p>
        </div>

        {/* CTA Button - Centered above Scroll */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <Button
            size="lg"
            className="bg-[#C4A962] hover:bg-[#B39952] text-white font-semibold px-8 py-6 text-base tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <span className="mr-2">📅</span> BOOK NOW
          </Button>
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
  );
};

export default HeroSection;
