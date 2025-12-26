import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function CheckoutForm({ bookingId, totalPrice, username, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    try {
      // 1. Get Session for JWT Verification
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError || !session) throw new Error("Authentication session expired. Please log in again.");

      // 2. Create Payment Intent via Edge Function
      const res = await fetch(
        "https://zzarkjbwaguputqedabm.supabase.co/functions/v1/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`, // JWT for security
          },
          body: JSON.stringify({
            amount: Math.round(totalPrice * 100), // Convert Dollars to Cents
            currency: "usd",
            bookingId,
            username,
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to initialize payment.");
      }

      const { clientSecret } = await res.json();

      // 3. Confirm Payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: username },
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.paymentIntent.status === "succeeded") {
        // 4. ATOMIC UPDATES: Booking Status & Room Availability
        // Get all rooms associated with this booking
        const { data: roomData, error: roomFetchErr } = await supabase
          .from("booking_rooms")
          .select("room_id")
          .eq("booking_id", bookingId);
          console.log("Booking ID:", bookingId);
console.log("Rooms found for this booking:", roomData);

        if (roomFetchErr) throw roomFetchErr;
        const roomIds = roomData.map((r) => r.room_id);
        console.log(roomIds)
        // Update both tables simultaneously
        const [bookingUpdate, roomsUpdate] = await Promise.all([
          supabase
            .from("bookings")
            .update({ payment_status: "paid", status: "confirmed" })
            .eq("id", bookingId),
          supabase
            .from("rooms")
            .update({ status: "occupied" })
            .in("id", roomIds),
        ]);

        if (bookingUpdate.error) throw bookingUpdate.error;
        if (roomsUpdate.error) throw roomsUpdate.error;

        setIsSuccess(true);
      }
    } catch (err) {
      console.error("Checkout Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        <h3 className="text-2xl font-serif mb-2">Payment Successful</h3>
        <p className="text-gray-500 text-sm mb-8">
          Your booking is confirmed. You can now view your reservation in the dashboard.
        </p>
        <button
          onClick={() => onClose(true)}
          className="w-full py-3 bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#000",
                "::placeholder": { color: "#aab7c4" },
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-xs justify-center bg-red-50 p-2 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-black text-white py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> 
            Processing...
          </>
        ) : (
          `Pay $${totalPrice.toLocaleString()}`
        )}
      </button>
    </form>
  );
}