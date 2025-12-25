import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { supabase } from './lib/supabase'

// Pages
import ConfirmPage from './pages/ConfirmPage'
import Home from './pages/Home'
import Facilities from './pages/Facilities'
import ContactUs from './pages/ContactUs'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ChatWindow from './components/ChatWindow'
import ChatToggleButton from './components/ChatToggleButton'
export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const user = session.user;

          // Check if profile exists
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (error && error.code === "PGRST116") {
            // Priority: metadata username > full_name > email prefix
            const username =
              user.user_metadata?.username || 
              user.user_metadata?.full_name || 
              user.email.split("@")[0];

            await supabase.from("profiles").insert({
              id: user.id,
              email: user.email,
              username: username,
            });
          }
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/confirm" element={<ConfirmPage />} />
        </Routes>

        {/* Global Chatbot UI */}
        <ChatWindow isOpen={isChatOpen} />
        <ChatToggleButton 
          isOpen={isChatOpen} 
          onClick={() => setIsChatOpen(!isChatOpen)} 
        />
      </div>
    </BrowserRouter>
  )
}