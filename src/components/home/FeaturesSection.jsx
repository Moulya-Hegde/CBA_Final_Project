import { Button } from '../ui/button';

const FeaturesSection = () => {
  return (
    <div className="py-12 sm:py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Luxury redefined card */}
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="md:w-1/2 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900">
              Luxury redefined
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Our rooms are designed to transport you into an environment made for leisure.
              Take your mind off the day-to-day of home life and find a private paradise for yourself.
            </p>
            <Button className="bg-[#D4A574] hover:bg-[#C4956F] text-white px-6 sm:px-8 cursor-pointer">
              EXPLORE
            </Button>
          </div>
          <div className="md:w-1/2 w-full">
            <img
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop"
              alt="Luxury hotel room"
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Leave your worries in the sand card */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8">
          <div className="md:w-1/2 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900">
              Leave your worries in the sand
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We love life at the beach. Being close to the ocean with access to endless sandy
              beach ensures a relaxed state of mind. It seems like time stands still watching the ocean.
            </p>
            <Button className="bg-[#D4A574] hover:bg-[#C4956F] text-white px-6 sm:px-8 cursor-pointer">
              EXPLORE
            </Button>
          </div>
          <div className="md:w-1/2 w-full">
            <img
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
              alt="Beach paradise"
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
