import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Footer from '../components/home/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BookingDialog from '@/components/booking/BookingDialog';
import { useAuth } from "@/context/AuthContext.jsx";
import {
  Users,
  Bed,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Building2,
  Book
} from 'lucide-react';

const RoomDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, openAuth, user } = useAuth();
  const [openBooking, setOpenBooking] = useState(false);
  // 1. Initialize state with location data if available, else fetch from Supabase
  const [room, setRoom] = useState(location.state?.room || null);
  const [loading, setLoading] = useState(!location.state?.room);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

  useEffect(() => {
    if (!room) {
      fetchRoomById();
    }
  }, [id]);

  const fetchRoomById = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('room_types')
        .select(`
          *,
          hotels (
            name,
            cities (name)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // 2. Format the dynamic data to match the UI expectations
      setRoom({
        ...data,
        price: data.base_price,
        image: data.main_image,
        gallery: data.gallery || [data.main_image], // Fallback if gallery is empty
        hotelName: data.hotels?.name,
        cityName: data.hotels?.cities?.name
      });
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
        <p className="tracking-widest uppercase text-xs">Loading Details...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold playfair-display">Room not found</h1>
          <Button onClick={() => navigate('/rooms')} className="bg-black text-white">Back to Rooms</Button>
        </div>
      </div>
    );
  }

  const images = room.gallery || [room.image];

  const nextImage = () => setCurrentImageIndex((p) => (p === images.length - 1 ? 0 : p + 1));
  const prevImage = () => setCurrentImageIndex((p) => (p === 0 ? images.length - 1 : p - 1));
  const handleClick = () => {
    if (!isAuthenticated) {
      openAuth();
      return;
    }
    setOpenBooking(true);
  };

  return (
    <div className="min-h-screen bg-white">
     
      {/* Header / Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
        <button
          onClick={() => navigate('/rooms')}
          className="flex items-center text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Selection
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Visuals & Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Gallery Section */}
            <div className="group relative">
              <div className="relative h-100 md:h-150 overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={images[currentImageIndex]}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                
                {images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white text-black p-3 rounded-full transition-all opacity-0 group-hover:opacity-100">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white text-black p-3 rounded-full transition-all opacity-0 group-hover:opacity-100">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex ? 'border-black' : 'border-transparent opacity-50'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description & Amenities */}
            <div className="space-y-12 border-t pt-12">
              <section>
                <h2 className="text-3xl font-bold playfair-display mb-6">The Space</h2>
                <p className="text-gray-600 leading-relaxed raleway text-lg">
                  {room.description}
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <section>
                  <h3 className="text-sm uppercase tracking-widest font-bold mb-6">Amenities</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {room.amenities?.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-600">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm raleway">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm uppercase tracking-widest font-bold mb-6">Features</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {room.features?.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        <span className="text-sm raleway">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <Card className="border-none shadow-2xl rounded-2xl overflow-hidden">
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      <MapPin className="w-3 h-3" />
                      {room.cityName}
                    </div>
                    <h1 className="text-4xl font-bold playfair-display leading-tight">{room.name}</h1>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Building2 className="w-3.5 h-3.5" />
                      {room.hotelName}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 py-4 border-y border-gray-50">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-tighter">{room.capacity} Guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-tighter">{room.beds}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">Nightly Rate</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold playfair-display italic">₹{room.price?.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-gray-400 font-medium">/ night</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-black hover:bg-gray-800 text-white py-8 rounded-none text-xs uppercase tracking-[0.3em] font-bold transition-all" onClick={handleClick}
                  >
                    Book Now
                  </Button>

                  <div className="space-y-3 pt-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    <p className="flex justify-between border-b pb-2"><span>Check-in</span> <span>14:00 PM</span></p>
                    <p className="flex justify-between border-b pb-2"><span>Check-out</span> <span>11:00 AM</span></p>
                  </div>
                </CardContent>
              </Card>
              
              <p className="text-center text-[10px] uppercase tracking-widest text-gray-400 px-6 leading-relaxed">
                Free cancellation up to 48 hours before check-in. Professional room service included.
              </p>
            </div>
          </div>

        </div>
      </div>
      <BookingDialog
  open={openBooking}
  onClose={(success) => {
    setOpenBooking(false);

    if (success) {
      // optional: show toast / navigate / refresh
      console.log("Booking successful");
    }
  }}
  roomTypeId={room.id}
  userId={supabase.auth.getUser()?.data?.user?.id}
/>


      <Footer />
    </div>
  );
};

export default RoomDetail;