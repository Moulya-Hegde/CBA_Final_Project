import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  IndianRupee,
  Bed,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Clock,
  Shield,
  Phone,
  ShoppingCart,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react';
import { roomsData } from '../data/roomsData';
import { useCart } from '../contexts/CartContext';

const RoomDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const room = location.state?.room || roomsData.find(r => r.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

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
    addToCart(room, selectedGuests);
    navigate('/checkout');
  };

  const handleAddToCart = () => {
    addToCart(room, selectedGuests);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Calculate discount (mock data - you can add this to roomsData later)
  const originalPrice = Math.round(room.price * 1.20); // 20% markup for original price
  const discountPercent = 20;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 raleway">
          <button
            onClick={() => navigate('/')}
            className="hover:text-[#C4A962] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRightIcon className="w-4 h-4" />
          <button
            onClick={() => navigate('/rooms')}
            className="hover:text-[#C4A962] transition-colors cursor-pointer"
          >
            Rooms
          </button>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{room.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gray-100">
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-900" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-900" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {room.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-28 rounded-xl overflow-hidden transition-all cursor-pointer ${
                    index === currentImageIndex
                      ? 'ring-2 ring-[#C4A962] ring-offset-2 scale-105'
                      : 'opacity-70 hover:opacity-100'
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

          {/* Right Column - Room Details */}
          <div className="space-y-6">
            {/* Room Title and Badge */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 playfair-display tracking-tight">
                {room.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#C4A962] text-white px-3 py-1 rounded-lg">
                    <span className="font-semibold text-lg">4.5</span>
                    <Star className="w-4 h-4 ml-1 fill-current" />
                  </div>
                  <span className="text-gray-600 raleway">210 Reviews</span>
                </div>
                {room.badge && (
                  <Badge className="bg-[#C4A962] hover:bg-[#B39952] text-white px-4 py-1 text-sm">
                    {room.badge}
                  </Badge>
                )}
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <div className="flex items-baseline">
                    <IndianRupee className="w-8 h-8 text-gray-900" />
                    <span className="text-5xl font-bold text-gray-900 playfair-display">
                      {room.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-gray-400 line-through text-2xl raleway">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </span>
                  <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 py-1">
                    {discountPercent}% Off
                  </Badge>
                </div>
                <p className="text-gray-600 raleway">per night (taxes included)</p>
              </div>

              {/* Description */}
              <p className="text-gray-700 raleway leading-relaxed text-base">
                {room.description}
              </p>
            </div>

            {/* Room Configuration */}
            <div className="space-y-4 py-6 border-y border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 raleway">
                  Bed Configuration :
                </label>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <Bed className="w-5 h-5 text-[#C4A962]" />
                  <span className="text-gray-900 font-medium raleway">{room.beds}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 raleway">
                  Number of Guests :
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setSelectedGuests(num)}
                      disabled={num > room.capacity}
                      className={`px-6 py-3 rounded-xl font-medium transition-all raleway ${
                        selectedGuests === num
                          ? 'bg-gray-900 text-white cursor-pointer'
                          : num <= room.capacity
                          ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 cursor-pointer'
                          : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2 raleway">
                  Maximum capacity: {room.capacity} guests
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleBookNow}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-semibold raleway rounded-xl transition-all shadow-lg hover:shadow-xl cursor-pointer"
                size="lg"
              >
                Book Now
              </Button>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 border-2 border-gray-900 hover:bg-gray-900 hover:text-white py-6 text-lg font-semibold raleway rounded-xl transition-all cursor-pointer"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  className={`px-6 py-6 rounded-xl border-2 transition-all cursor-pointer ${
                    isWishlisted
                      ? 'border-red-500 bg-red-50 hover:bg-red-100'
                      : 'border-gray-300 hover:border-[#C4A962] hover:bg-gray-50'
                  }`}
                  size="lg"
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                  />
                </Button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {/* Free Cancellation Card */}
              <Card className="border-2 border-gray-100 hover:border-[#C4A962]/30 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#C4A962]/10 p-3 rounded-xl">
                      <Clock className="w-6 h-6 text-[#C4A962]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 raleway">
                        Free Cancellation
                      </h3>
                      <p className="text-sm text-gray-600 raleway">
                        Cancel up to 24 hours before check-in for a full refund
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Best Price Guarantee Card */}
              <Card className="border-2 border-gray-100 hover:border-[#C4A962]/30 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#C4A962]/10 p-3 rounded-xl">
                      <Shield className="w-6 h-6 text-[#C4A962]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 raleway">
                        Best Price Guarantee
                      </h3>
                      <p className="text-sm text-gray-600 raleway">
                        We guarantee the best rates. Find a lower price and we'll match it
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 24/7 Support Card */}
              <Card className="border-2 border-gray-100 hover:border-[#C4A962]/30 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#C4A962]/10 p-3 rounded-xl">
                      <Phone className="w-6 h-6 text-[#C4A962]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 raleway">
                        24/7 Customer Support
                      </h3>
                      <p className="text-sm text-gray-600 raleway">
                        Our dedicated support team is available round the clock to assist you
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-2 border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 playfair-display text-gray-900">
                Room Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-[#C4A962]/10 p-2 rounded-lg">
                      <Check className="w-4 h-4 text-[#C4A962]" />
                    </div>
                    <span className="text-gray-700 raleway">{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 playfair-display text-gray-900">
                Room Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-[#C4A962]/10 p-2 rounded-lg">
                      <Check className="w-4 h-4 text-[#C4A962]" />
                    </div>
                    <span className="text-gray-700 raleway">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back to Rooms Button */}
        <div className="mt-12">
          <Button
            variant="outline"
            onClick={() => navigate('/rooms')}
            className="border-2 border-gray-300 hover:border-[#C4A962] hover:bg-[#C4A962]/5 raleway cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Rooms
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RoomDetail;
