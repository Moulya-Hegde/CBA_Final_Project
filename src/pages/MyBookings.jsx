import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext.jsx";
import { Calendar, MapPin, Bed, CheckCircle2, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/home/Navbar";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          booking_rooms (
            rooms (
              room_number,
              room_types (
                name,
                main_image,
                hotels (
                  name,
                  address
                )
              )
            )
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {/* Page background: Soft Slate instead of deep black */}
      <div className="min-h-screen bg-[#1a1c20] pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Header: More elegant, less aggressive */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-serif mb-3 text-[#f3f4f6] tracking-tight">
              My Reservations
            </h1>
            <div className="h-px w-20 bg-amber-200/30 mb-4" /> {/* Soft accent line */}
            <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] font-medium">
              Your journey with Zivara
            </p>
          </div>
  
          {bookings.length === 0 ? (
            <div className="bg-[#24272d] rounded-2xl p-16 text-center border border-white/5 shadow-xl">
              <Calendar className="w-12 h-12 mx-auto mb-6 text-gray-500 opacity-50" />
              <h2 className="text-xl font-serif mb-4 text-white">No active stays found</h2>
              <Link 
                to="/rooms" 
                className="inline-block px-8 py-3 border border-amber-200/50 text-amber-100 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-amber-200 hover:text-black transition-all duration-500"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {bookings.map((booking) => {
                const roomInfo = booking.booking_rooms[0]?.rooms;
                const roomType = roomInfo?.room_types;
                const hotel = roomType?.hotels;
  
                return (
                  <div 
                    key={booking.id} 
                    className="group bg-[#24272d] rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5"
                  >
                    {/* Image: Muted with a soft overlay */}
                    <div className="md:w-[350px] h-64 md:h-auto relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
                      <img 
                        src={roomType?.main_image} 
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        alt=""
                      />
                    </div>
  
                    {/* Content: Soft typography and low-contrast labels */}
                    <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <p className="text-[10px] text-amber-200/60 uppercase tracking-[0.2em] mb-2 font-bold">Confirmed Suite</p>
                            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">
                              {roomType?.name}
                            </h3>
                            <p className="text-gray-400 text-xs flex items-center gap-2">
                              <MapPin size={12} className="text-amber-200/40" />
                              {hotel?.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[22px] font-light text-white tracking-tighter">
                              ₹{booking.total_price.toLocaleString()}
                            </p>
                            <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Inclusive of Taxes</p>
                          </div>
                        </div>
  
                        {/* Info Bar: Using subtle separators */}
                        <div className="flex flex-wrap gap-y-6 md:gap-12 py-6 border-t border-white/5">
                          <div className="min-w-[120px]">
                            <span className="block text-[9px] text-gray-500 uppercase tracking-widest mb-1">Check-in</span>
                            <span className="text-gray-200 font-medium text-sm">
                              {new Date(booking.check_in).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                            </span>
                          </div>
                          <div className="min-w-[120px]">
                            <span className="block text-[9px] text-gray-500 uppercase tracking-widest mb-1">Check-out</span>
                            <span className="text-gray-200 font-medium text-sm">
                              {new Date(booking.check_out).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-gray-500 uppercase tracking-widest mb-1">Accommodation</span>
                            <span className="text-gray-200 font-medium text-sm">Room {roomInfo?.room_number}</span>
                          </div>
                        </div>
                      </div>
  
                      {/* Footer: Quiet but functional */}
                      <div className="mt-8 flex items-center justify-between">
                        <div className={`px-4 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest ${
                          booking.payment_status === 'paid' 
                            ? 'border-emerald-500/20 text-emerald-400/80 bg-emerald-500/5' 
                            : 'border-amber-500/20 text-amber-400/80 bg-amber-500/5'
                        }`}>
                          {booking.payment_status === 'paid' ? 'Secure Payment Confirmed' : 'Awaiting Payment'}
                        </div>
                        
                        <button className="text-[10px] text-gray-400 hover:text-white flex items-center gap-2 transition-colors uppercase tracking-widest group/btn">
                          Manage Itinerary 
                          <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookings;