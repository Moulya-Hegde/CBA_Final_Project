import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { supabase } from "@/lib/supabase";
import { Loader2, TrendingUp, Calendar, ArrowLeft, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/home/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Analytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("volume"); // 'volume' or 'revenue'
  
  // Data States
  const [bookingStats, setBookingStats] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [revenueStats, setRevenueStats] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [totals, setTotals] = useState({ volume: 0, revenue: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("bookings")
          .select("created_at, total_price");

        if (error) throw error;

        const counts = [0, 0, 0, 0, 0, 0, 0];
        const revenue = [0, 0, 0, 0, 0, 0, 0];
        let totalRev = 0;

        data.forEach((booking) => {
          const day = new Date(booking.created_at).getDay(); 
          counts[day] += 1;
          revenue[day] += Number(booking.total_price || 0);
          totalRev += Number(booking.total_price || 0);
        });

        // Reorder to [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
        const reorder = (arr) => [arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[0]];
        
        setBookingStats(reorder(counts));
        setRevenueStats(reorder(revenue));
        setTotals({ volume: data.length, revenue: totalRev });
      } catch (err) {
        console.error("Analytics Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const activeData = view === "volume" ? bookingStats : revenueStats;

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: view === "volume" ? "Bookings" : "Revenue (₹)",
        data: activeData,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, view === "volume" ? "rgba(196, 169, 98, 0.3)" : "rgba(34, 197, 94, 0.2)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          return gradient;
        },
        borderColor: view === "volume" ? "#C4A962" : "#22c55e",
        pointBackgroundColor: view === "volume" ? "#C4A962" : "#22c55e",
        pointBorderColor: "#0f172a",
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        callbacks: {
          label: (context) => view === "revenue" ? ` ₹${context.parsed.y.toLocaleString()}` : ` ${context.parsed.y} Bookings`
        }
      },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { 
            color: "#94a3b8",
            callback: (value) => view === "revenue" ? `₹${value >= 1000 ? value/1000 + 'k' : value}` : value
        }
      },
      x: { grid: { display: false }, ticks: { color: "#94a3b8" } }
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#C4A962]" size={40} />
    </div>
  );

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto mt-18">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#C4A962] mb-8 group transition-colors">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">Back to Dashboard</span>
        </button>

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#C4A962] tracking-[0.4em] text-[10px] uppercase font-bold mb-3">Finance & Growth</p>
            <h1 className="text-5xl font-serif italic">Executive Insights</h1>
          </div>
          <div className="flex gap-4">
            <StatSmall icon={<TrendingUp />} label="Weekly Bookings" value={totals.volume} />
            <StatSmall icon={<IndianRupee />} label="Total Revenue" value={`₹${totals.revenue.toLocaleString()}`} />
          </div>
        </header>

        <div className="bg-[#1e293b]/30 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-2xl mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-[#C4A962]" size={18} />
              <h2 className="text-lg font-serif italic text-gray-200">
                {view === "volume" ? "Booking Frequency" : "Revenue Generation"} (7 Days)
              </h2>
            </div>
            
            {/* TOGGLE BUTTONS */}
            <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10">
              <button 
                onClick={() => setView("volume")}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${view === 'volume' ? 'bg-[#C4A962] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                Volume
              </button>
              <button 
                onClick={() => setView("revenue")}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${view === 'revenue' ? 'bg-[#22c55e] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                Revenue
              </button>
            </div>
          </div>

          <div className="h-[400px]">
            <Line data={data} options={options} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <div key={day} className="bg-[#1e293b]/20 p-6 rounded-2xl border border-white/5 text-center group hover:border-[#C4A962]/30 transition-all">
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2">{day}</p>
              <p className="text-2xl font-serif">
                {view === 'volume' ? activeData[i] : `₹${(activeData[i]/1000).toFixed(1)}k`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

const StatSmall = ({ icon, label, value }) => (
  <div className="bg-[#1e293b]/50 border border-white/10 p-4 rounded-2xl flex items-center gap-4 min-w-[160px]">
    <div className="bg-white/5 p-2 rounded-lg text-[#C4A962]">{icon}</div>
    <div>
      <p className="text-[9px] text-gray-500 uppercase tracking-tighter">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  </div>
);

export default Analytics;