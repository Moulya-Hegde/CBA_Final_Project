import { Card } from '../ui/card';
import { Dumbbell, Utensils, Waves, Wine, Sparkles, Shirt } from 'lucide-react';

const FacilitiesShowcase = () => {
  const facilities = [
    {
      name: 'THE GYM',
      icon: Dumbbell,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&q=80',
      description: 'State-of-the-art fitness equipment and personal training'
    },
    {
      name: 'POOLSIDE BAR',
      icon: Wine,
      image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&h=600&fit=crop&q=80',
      description: 'Refreshing drinks and cocktails with stunning views'
    },
    {
      name: 'THE SPA',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop&q=80',
      description: 'Rejuvenating treatments and wellness therapies'
    },
    {
      name: 'SWIMMING POOL',
      icon: Waves,
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop&q=80',
      description: 'Infinity pool with breathtaking panoramic views'
    },
    {
      name: 'RESTAURANT',
      icon: Utensils,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80',
      description: 'Fine dining experience with international cuisine'
    },
    {
      name: 'LAUNDRY',
      icon: Shirt,
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&h=600&fit=crop&q=80',
      description: 'Premium laundry and dry cleaning services'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6">
            FACILITIES
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We want your stay at our lush hotel to be truly unforgettable. That is why we give special
            attention to all of your needs so that we can ensure an experience quite uniquw. Luxury hotels
            offers the perfect setting with stunning views for leisure and our modern luxury resort
            facilities will help you enjoy the best of all.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

                  {/* Icon - appears on hover */}
                  <div className="absolute top-6 right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-[#D4A574]/90 backdrop-blur-sm p-3 rounded-full">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500">
                    {/* Facility Name */}
                    <div className="mb-2">
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
                        {facility.name}
                      </h3>
                      {/* Decorative underline */}
                      <div className="h-1 w-16 bg-[#D4A574] mt-2 rounded-full transform origin-left transition-all duration-500 group-hover:w-24" />
                    </div>

                    {/* Description - slides up on hover */}
                    <p className="text-gray-200 text-sm md:text-base leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {facility.description}
                    </p>
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block">
            <p className="text-gray-600 text-lg italic">
              Experience luxury like never before
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4A574] to-transparent mt-4" />
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default FacilitiesShowcase;
