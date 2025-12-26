import { useState, useEffect } from "react";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Home,
  CreditCard,
  Loader2,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useRoomAvailability } from "../../hooks/useRoomAvailability";
import { useAuth } from "@/context/AuthContext";
import StripeWrapper from "../StripeWrapper";

const BookingDialog = ({ open, onClose, roomTypeId }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const GST_RATE = 0.18;
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [bookingId, setBookingId] = useState(null);
  const [totalPrice, setTotalPrice] = useState({
    nights: 0,
    subtotal: 0,
    gst: 0,
    grandTotal: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // RESET STATE ON CLOSE
  useEffect(() => {
    if (!open) {
      setStep(1);
      setError("");
      setBookingId(null);
      setSelectedRooms([]);
    }
  }, [open]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const { data, error } = await supabase
          .from("room_types")
          .select("base_price")
          .eq("id", roomTypeId)
          .single();
        if (!error) setRoomPrice(data.base_price);
      } catch (err) {
        console.error("Price fetch error:", err);
      }
    };
    if (open) fetchPrice();
  }, [roomTypeId, open]);

  useEffect(() => {
    if (!checkIn || !checkOut || !roomPrice) return;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = (end - start) / (1000 * 60 * 60 * 24);
    
    if (nights <= 0) {
      setTotalPrice({ nights: 0, subtotal: 0, gst: 0, grandTotal: 0 });
      return;
    }

    const subtotal = nights * roomPrice * selectedRooms.length;
    const gst = subtotal * GST_RATE;
    setTotalPrice({ nights, subtotal, gst, grandTotal: subtotal + gst });
  }, [checkIn, checkOut, selectedRooms, roomPrice]);

  if (!open) return null;

  const steps = [
    { id: 1, label: "Dates", icon: <Calendar className="w-4 h-4" /> },
    { id: 2, label: "Selection", icon: <Home className="w-4 h-4" /> },
    { id: 3, label: "Review", icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => !loading && onClose(false)}
      />

      {/* Dialog Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100 relative">
          <button
            onClick={() => onClose(false)}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-serif text-gray-900 mb-6 playfair-display">
            Reserve Your Sanctuary
          </h2>

          {/* Step Indicator */}
          <div className="flex items-center justify-between max-w-md mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 -z-10" />
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    step >= s.id
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-200 text-gray-400"
                  }`}
                >
                  {s.icon}
                </div>
                <span
                  className={`text-[10px] uppercase tracking-widest font-bold ${
                    step >= s.id ? "text-black" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div key={step} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {step === 1 && (
              <div className="space-y-8">
                <p className="text-gray-500 text-sm raleway">
                  Please select your preferred arrival and departure dates.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-gray-400">Arrival Date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-gray-400">Departure Date</label>
                    <input
                      type="date"
                      min={checkIn || new Date().toISOString().split("T")[0]}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <h3 className="text-lg font-serif">Available Accommodations</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-50 px-3 py-1 rounded-full border">
                    {availableRooms.length} Found
                  </span>
                </div>
                {!availableRooms.length ? (
                  <div className="py-12 text-center bg-gray-50 rounded-xl border border-dashed">
                    <p className="text-sm text-gray-400">No suites available for these dates.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {availableRooms.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRooms(prev => prev.includes(room.id) ? prev.filter(r => r !== room.id) : [...prev, room.id])}
                        className={`h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                          selectedRooms.includes(room.id) ? "border-black bg-black text-white scale-95" : "border-gray-100 bg-white hover:border-gray-300"
                        }`}
                      >
                        <span className="text-xs font-bold uppercase">{room.room_number}</span>
                        <span className="text-[9px] uppercase opacity-60">Suite</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Invoice Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Stay Duration</span>
                      <span className="text-black">{totalPrice.nights} Nights</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Rooms Selected</span>
                      <span className="text-black">{selectedRooms.length} Units</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-medium pb-4 border-b">
                      <span>Subtotal</span>
                      <span className="text-black">₹{totalPrice.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-xs uppercase font-bold tracking-widest">Total Payable</span>
                      <span className="text-2xl font-serif text-black">₹{totalPrice.grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-medium border border-red-100">{error}</div>}

                {/* Integration Point for Stripe */}
                {/* STRIPE INTEGRATION POINT */}
    {bookingId ? (
      <div className="mt-6 p-6 border border-gray-100 rounded-2xl bg-white shadow-sm animate-in fade-in slide-in-from-top-2">
        <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-6">
          Secure Payment
        </h4>
        <StripeWrapper 
          bookingId={bookingId} 
          totalPrice={totalPrice.grandTotal} 
          username={user?.email || "Guest"} 
          onClose={onClose}
        />
      </div>
    ) : (
      /* Show error if something went wrong creating the booking */
      error && <div className="text-red-500 text-xs">{error}</div>
    )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-8 bg-white border-t border-gray-100 flex items-center justify-between">
          {step > 1 && !bookingId ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {!bookingId && (
            <button
              disabled={loading || (step === 1 && (!checkIn || !checkOut)) || (step === 2 && !selectedRooms.length)}
              onClick={async () => {
                setError("");
                if (step === 1) {
                  setLoading(true);
                  try {
                    const rooms = await useRoomAvailability(roomTypeId, checkIn, checkOut);
                    setAvailableRooms(rooms);
                    setStep(2);
                  } finally { setLoading(false); }
                } else if (step === 2) {
                  setStep(3);
                } else if (step === 3) {
                  setLoading(true);
                  try {
                    // Create Booking
                    const { data: b, error: bErr } = await supabase.from("bookings").insert({
                      user_id: user?.id,
                      check_in: checkIn,
                      check_out: checkOut,
                      total_price: totalPrice.grandTotal,
                      status: "pending",
                      payment_status: "unpaid",
                    }).select().single();
                    if (bErr) throw bErr;

                    // Link Rooms
                    const { error: rErr } = await supabase.from("booking_rooms").insert(
                      selectedRooms.map(id => ({ booking_id: b.id, room_id: id }))
                    );
                    if (rErr) throw rErr;

                    setBookingId(b.id);
                  } catch (err) {
                    setError(err.message);
                  } finally { setLoading(false); }
                }
              }}
              className="flex items-center gap-3 px-10 py-4 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gray-800 disabled:opacity-30 transition-all"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <> {step === 3 ? "Generate Invoice" : "Continue"} <ChevronRight className="w-4 h-4" /> </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDialog;