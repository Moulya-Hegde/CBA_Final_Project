import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Footer from '../components/home/Footer';
import RoomCard3D from '../components/rooms/RoomCard3D';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { roomsData } from '../data/roomsData';

const Rooms = () => {
  const navigate = useNavigate();

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const handleRoomClick = (room) => {
    navigate(`/rooms/${room.id}`, { state: { room } });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="space-y-6">
            {/* Welcome Text */}
            <p className="text-white text-lg md:text-xl font-light tracking-widest raleway">
              ROOMS AND RATES
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
              Each of our bright, light-flooded rooms come with everything you could possibly need for a comfortable stay. And yes, comfort isn't our only objective.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Button
                size="lg"
                onClick={scrollToNext}
                className="bg-[#C4A962] hover:bg-[#B39952] text-white font-semibold px-8 py-6 text-base tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">🛏️</span> VIEW ROOMS
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

      {/* Rooms Grid Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 playfair-display">
              Available Rooms
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto raleway">
              Choose from our selection of beautifully designed rooms and suites, each offering comfort and luxury
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {roomsData.map((room) => (
              <RoomCard3D key={room.id} room={room} onClick={handleRoomClick} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Rooms;
