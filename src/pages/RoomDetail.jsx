import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  IndianRupee,
  Users,
  Bed,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { roomsData } from '../data/roomsData';

const RoomDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const room = location.state?.room || roomsData.find(r => r.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Room not found</h1>
          <Button onClick={() => navigate('/rooms')}>Back to Rooms</Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === room.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? room.gallery.length - 1 : prev - 1
    );
  };

  const handleBookNow = () => {
    // TODO: Navigate to booking page or open booking modal
    console.log('Booking room:', room);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/rooms')}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Rooms
        </Button>
      </div>

      {/* Room Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-xl">
                <img
                  src={room.gallery[currentImageIndex]}
                  alt={`${room.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {room.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {room.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {room.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-24 rounded-lg overflow-hidden transition-all ${
                      index === currentImageIndex
                        ? 'ring-2 ring-[#C4A962] ring-offset-2'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${room.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Room Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 playfair-display">About This Room</h2>
                <p className="text-gray-700 raleway leading-relaxed">
                  {room.description}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 playfair-display">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#C4A962]" />
                      <span className="text-gray-700 raleway">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 playfair-display">Room Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {room.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#C4A962]" />
                      <span className="text-gray-700 raleway">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-2 border-[#C4A962]/20">
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold playfair-display">{room.name}</h1>
                    {room.badge && (
                      <Badge className="bg-[#C4A962] hover:bg-[#B39952] text-white">
                        {room.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-gray-600 mt-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-5 h-5" />
                      <span className="raleway">{room.capacity} Guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="w-5 h-5" />
                      <span className="raleway">{room.beds}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-b py-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <IndianRupee className="w-6 h-6 text-[#C4A962]" />
                    <span className="text-4xl font-bold text-[#C4A962] playfair-display">
                      {room.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-gray-500 raleway">/night</span>
                  </div>
                  <p className="text-sm text-gray-500 raleway">
                    Taxes and fees included
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleBookNow}
                    className="w-full bg-[#C4A962] hover:bg-[#B39952] text-white py-6 text-lg font-semibold"
                    size="lg"
                  >
                    Book Now
                  </Button>

                  <p className="text-center text-sm text-gray-500 raleway">
                    Free cancellation up to 24 hours before check-in
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <h3 className="font-semibold text-gray-900 raleway">Quick Info</h3>
                  <div className="space-y-1 text-sm text-gray-600 raleway">
                    <p>✓ Instant confirmation</p>
                    <p>✓ Best price guarantee</p>
                    <p>✓ Secure payment</p>
                    <p>✓ 24/7 customer support</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RoomDetail;
