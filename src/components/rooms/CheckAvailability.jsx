import { useEffect, useState } from "react";
import { MapPin, Calendar, Search, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";

const CheckAvailability = ({ onSearch }) => {
  const [filteredCities, setFilteredCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ----------------------------------
     FETCH ONLY CITIES WITH INVENTORY
  -----------------------------------*/
  useEffect(() => {
    fetchAvailableCities();
  }, []);

  const fetchAvailableCities = async () => {
    const { data, error } = await supabase
      .from("cities")
      .select(
        `
        name,
        hotels!inner (
          room_types!inner (
            rooms!inner (
              status
            )
          )
        )
      `
      )
      .eq("hotels.room_types.rooms.status", "available");

    if (!error) {
      const unique = [...new Set(data.map((c) => c.name))];
      setAvailableCities(unique);
    }
  };

  /* ----------------------------------
     SUBMIT
  -----------------------------------*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!city || !checkIn || !checkOut) {
      setError("Please select destination and dates");
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      setError("Check-out must be after check-in");
      return;
    }

    const normalized = city.trim().toLowerCase();
    const validCity = availableCities
      .map((c) => c.toLowerCase())
      .includes(normalized);

    if (!validCity) {
      setError("No available rooms in this destination");
      return;
    }

    setLoading(true);

    /* ----------------------------------
       VERIFY DATE AVAILABILITY
    -----------------------------------*/
    const { data, error: availabilityError } = await supabase
      .from("room_types")
      .select(
        `
        id,
        hotels!inner (
          cities!inner ( name )
        ),
        rooms!inner (
          id,
          bookings (
            check_in,
            check_out
          )
        )
      `
      )
      .eq("hotels.cities.name", city);

    if (availabilityError || !data?.length) {
      setError("No availability for selected dates");
      setLoading(false);
      return;
    }

    const hasAvailableRoom = data.some((rt) =>
      rt.rooms.some(
        (room) =>
          !room.bookings?.some(
            (b) =>
              new Date(b.check_in) < new Date(checkOut) &&
              new Date(b.check_out) > new Date(checkIn)
          )
      )
    );

    if (!hasAvailableRoom) {
      setError("All rooms are booked for selected dates");
      setLoading(false);
      return;
    }

    setLoading(false);
    onSearch({ location: city, checkIn, checkOut });
  };

  /* ----------------------------------
     UI
  -----------------------------------*/
  return (
    <div className="relative z-30 bg-gray-100 shadow-2xl border border-gray-900 drop-shadow-black rounded-2xl mt-10 mx-auto max-w-6xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row items-stretch gap-6 px-8 py-8"
      >
        {/* CITY */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={city}
            onChange={(e) => {
              const value = e.target.value;
              setCity(value);

              if (!value) {
                setFilteredCities([]);
                setShowSuggestions(false);
                return;
              }

              const matches = availableCities.filter((c) =>
                c.toLowerCase().startsWith(value.toLowerCase())
              );

              setFilteredCities(matches);
              setShowSuggestions(true);
            }}
            onFocus={() => city && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="Destination city"
            className="w-full pl-10 py-4 border-b border-gray-300 text-sm tracking-wide focus:outline-none focus:border-black"
          />

          {showSuggestions && filteredCities.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-xl mt-2 max-h-48 overflow-auto z-50">
              {filteredCities.map((c) => (
                <li
                  key={c}
                  onMouseDown={() => {
                    setCity(c);
                    setShowSuggestions(false);
                  }}
                  className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 transition"
                >
                  <span className="font-medium">{c}</span>
                  <span className="text-xs text-gray-400 ml-2">India</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* DATES */}
        <div className="flex flex-1 gap-4">
          <div className="flex-1">
            <label className="text-[9px] uppercase tracking-widest text-gray-400">
              Check In
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => {
                  const value = e.target.value;
                  setCheckIn(value);

                  // If checkout is before new checkin → reset checkout
                  if (checkOut && value >= checkOut) {
                    setCheckOut("");
                  }
                }}
                className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="text-[9px] uppercase tracking-widest text-gray-400">
              Check Out
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={loading}
          className="px-12 py-4 bg-black text-white text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-gray-800 transition flex items-center gap-3"
        >
          <Search className="w-3 h-3" />
          {loading ? "Checking…" : "Check Availability"}
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-2 px-8 pb-6 text-xs text-red-500">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default CheckAvailability;
