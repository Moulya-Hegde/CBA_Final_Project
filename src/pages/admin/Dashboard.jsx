import React, { useEffect, useState } from "react";
import { Building2, Users, CalendarCheck, IndianRupee, Loader2, ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/home/Navbar";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ hotels: 0, users: 0, bookings: 0, revenue: 0 });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Global Stats
        const { count: hotelCount } = await supabase.from('hotels').select('*', { count: 'exact', head: true });
        const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        
        // 2. Fetch All Bookings for Revenue and the Detailed Table
        const { data: allBookings, error } = await supabase
          .from('bookings')
          .select(`
            id,
            total_price,
            check_in,
            check_out,
            status,
            user_id,
            profiles (username, email, is_admin),
            booking_rooms (
              rooms (
                room_number,
                room_types (name)
              )
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Calculate Stats from the fetched data
        const totalRevenue = allBookings?.reduce((acc, curr) => acc + Number(curr.total_price), 0) || 0;

        setStats({
          hotels: hotelCount || 0,
          users: userCount || 0,
          bookings: allBookings?.length || 0,
          revenue: totalRevenue,
        });

        setRecentBookings(allBookings || []);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-[#C4A962] animate-spin" />
    </div>
  );

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-10 font-sans ">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 mt-18">
          <h1 className="text-4xl font-serif italic text-white mb-2">System Overview</h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase">Real-time Property & Booking Analytics</p>
        </div>

        {/* 1. Global Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<Building2 />} title="Properties" value={stats.hotels} color="text-blue-400" />
          <StatCard icon={<Users />} title="Total Clients" value={stats.users} color="text-purple-400" />
          <StatCard icon={<CalendarCheck />} title="Bookings" value={stats.bookings} color="text-[#C4A962]" />
          <StatCard icon={<IndianRupee />} title="Revenue" value={`₹${stats.revenue.toLocaleString()}`} color="text-green-400" />
        </div>

        {/* 2. Detailed Booking Table */}
        <div className="bg-[#1e293b]/40 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-serif">Recent Activity</h3>
            <button className="text-[10px] tracking-[0.2em] uppercase border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all">
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-black/20 text-gray-500 text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-6 py-4">Guest Details</th>
                  <th className="px-6 py-4">Room Assignment</th>
                  <th className="px-6 py-4">Stay Duration</th>
                  <th className="px-6 py-4">Transaction</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#C4A962] to-[#8a753d] flex items-center justify-center text-xs font-bold">
                          {booking.profiles?.username?.[0] || 'G'}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {booking.profiles?.username} 
                            {booking.profiles?.is_admin && <span className="ml-2 text-[8px] bg-white/10 text-[#C4A962] px-1 rounded">ADMIN</span>}
                          </div>
                          <div className="text-[11px] text-gray-500">{booking.profiles?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {booking.booking_rooms?.map((br, i) => (
                        <div key={i} className="text-sm">
                          <span className="text-white font-medium">Room {br.rooms?.room_number}</span>
                          <span className="text-gray-500 text-xs block">{br.rooms?.room_types?.name}</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-300">In: {booking.check_in}</div>
                      <div className="text-xs text-gray-500 italic">Out: {booking.check_out}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-[#C4A962]">₹{Number(booking.total_price).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                        booking.status === 'confirmed' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-[#1e293b]/60 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
    <div className={`mb-4 transition-transform group-hover:scale-110 ${color}`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{title}</p>
    <p className="text-2xl font-bold tracking-tight">{value}</p>
  </div>
  
);

export default Dashboard;