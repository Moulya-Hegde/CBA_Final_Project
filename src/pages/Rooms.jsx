import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/home/Navbar";
import TestimonialsSection from "../components/home/TestimonialsSection";
import Footer from "../components/home/Footer";
import RoomCard3D from "../components/rooms/RoomCard3D";
import CheckAvailability from "../components/rooms/CheckAvailability";
import { ChevronDown, Loader2, Plus, SearchX } from "lucide-react";

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [currentFilters, setCurrentFilters] = useState(null);

  const ITEMS_PER_PAGE = 6;
  const [isAuthRestored, setIsAuthRestored] = useState(false);

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setIsAuthRestored(true);
  });
}, []);

useEffect(() => {
  if (isAuthRestored) {
    fetchRooms(0, true);
  }
}, [isAuthRestored]);

  const fetchRooms = async (
    pageNumber,
    isInitial = false,
    filters = currentFilters
  ) => {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      const from = pageNumber * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from("room_types")
        .select(
          `
    *,
    hotels!inner (
      name,
      cities!inner (
        name
      )
    ),
    rooms (
      status
    )
  `,
          { count: "exact" }
        )
        .eq("rooms.status", "available");

      // 📍 LOCATION FILTER (city OR hotel name)
      if (filters?.location) {
        query = query.eq("hotels.cities.name", filters.location);
      }

      // 👥 GUEST FILTER
      if (filters?.guests) {
        query = query.gte("capacity", Number(filters.guests));
      }

      const { data, error, count } = await query
        .order("base_price", { ascending: true })
        .range(from, to);

      if (error) throw error;

      const formattedRooms = data.map((room) => ({
        ...room,
        price: room.base_price,
        image: room.main_image,
        hotelName: room.hotels.name,
        cityName: room.hotels.cities.name,
      }));

      if (isInitial) setRooms(formattedRooms);
      else setRooms((prev) => [...prev, ...formattedRooms]);

      setHasMore(from + data.length < count);
    } catch (err) {
      console.error("Fetch rooms error:", err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = (filters) => {
    setCurrentFilters(filters);
    setPage(0);
    fetchRooms(0, true, filters);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRooms(nextPage);
  };

  const scrollToNext = () => {
    const element = document.getElementById("availability-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Height reduced for better flow to search */}
      <section className="relative h-[75vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <p className="text-white text-sm md:text-base font-light tracking-[0.4em] raleway uppercase mb-4">
            Zivara India Collection
          </p>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight playfair-display mb-8">
            DISCOVER LUXURY
          </h1>
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center gap-4 text-white"
          >
            <div className="w-px h-16 bg-white/30 group-hover:bg-white transition-colors duration-500" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold">
              Explore Now
            </span>
          </button>
        </div>
      </section>

      {/* SEARCH BAR POSITION: Between Hero and Grid */}
      <div id="availability-section">
        <CheckAvailability onSearch={handleSearch} />
      </div>

      {/* Main Grid Section */}
      <section className="py-20 bg-gray-50" id="rooms-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold playfair-display text-gray-900 mb-2">
                {currentFilters?.location
                  ? `Rooms in "${currentFilters.location}"`
                  : "Available Suites"}
              </h2>
              <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">
                Handpicked luxury for your stay
              </p>
            </div>
            {rooms.length > 0 && (
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Showing {rooms.length} results
              </p>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-10 h-10 text-black animate-spin mb-4" />
              <p className="raleway text-gray-400 text-[10px] uppercase tracking-widest">
                Searching our collection...
              </p>
            </div>
          ) : rooms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-2xl border border-dashed border-gray-200">
              <SearchX className="w-12 h-12 text-gray-200 mb-4" />
              <h3 className="text-xl font-bold playfair-display">
                No matches found
              </h3>
              <p className="text-gray-400 text-sm mt-2 max-w-xs mx-auto">
                Try adjusting your filters or destination to see more available
                rooms.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {rooms.map((room) => (
                  <RoomCard3D
                    key={room.id}
                    room={room}
                    onClick={() =>
                      navigate(`/rooms/${room.id}`, { state: { room } })
                    }
                  />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-20">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="group relative px-10 py-4 text-[11px] font-bold uppercase tracking-[0.3em] border border-black text-black overflow-hidden transition-all duration-500 disabled:opacity-50"
                  >
                    <span className="absolute inset-0 bg-black scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
                    <div className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                      {loadingMore ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                      <span>{loadingMore ? "Fetching..." : "Load More"}</span>
                    </div>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Rooms;
