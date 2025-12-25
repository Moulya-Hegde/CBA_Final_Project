import { Card } from '../ui/card';
import { MapPin } from 'lucide-react';

const LocationsCarousel = () => {
  const locations = [
    {
      city: 'Bangalore',
      state: 'Karnataka',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&h=300&fit=crop',
      description: 'The Garden City'
    },
    {
      city: 'Mumbai',
      state: 'Maharashtra',
      image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400&h=300&fit=crop',
      description: 'City of Dreams'
    },
    {
      city: 'Delhi',
      state: 'National Capital',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop',
      description: 'Heart of India'
    },
    {
      city: 'Chennai',
      state: 'Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop',
      description: 'Gateway to South'
    },
    {
      city: 'Kolkata',
      state: 'West Bengal',
      image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=400&h=300&fit=crop',
      description: 'City of Joy'
    },
    {
      city: 'Hyderabad',
      state: 'Telangana',
      image: 'https://images.unsplash.com/photo-1591361184449-d7d6c4f3a3d0?w=400&h=300&fit=crop',
      description: 'City of Pearls'
    },
    {
      city: 'Goa',
      state: 'Goa',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop',
      description: 'Beach Paradise'
    },
    {
      city: 'Jaipur',
      state: 'Rajasthan',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop',
      description: 'The Pink City'
    }
  ];

  // Duplicate locations for seamless infinite scroll
  const duplicatedLocations = [...locations, ...locations];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Our Locations
          </h2>
          <p className="text-gray-600 text-lg">
            Experience luxury across India's most vibrant cities
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden">
          <style>
            {`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }

              .animate-scroll {
                animation: scroll 10s linear infinite;
              }

              .animate-scroll:hover {
                animation-play-state: paused;
              }
            `}
          </style>

          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex animate-scroll">
            {duplicatedLocations.map((location, index) => (
              <div key={index} className="flex-shrink-0 px-2" style={{ width: '500px' }}>
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="relative">
                    <img
                      src={location.image}
                      alt={location.city}
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center gap-1.5 mb-1">
                        <MapPin className="w-4 h-4 text-[#D4A574]" />
                        <h3 className="text-lg font-bold">{location.city}</h3>
                      </div>
                      <p className="text-xs text-gray-200 mb-0.5">{location.state}</p>
                      <p className="text-xs text-gray-300 italic">{location.description}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsCarousel;
