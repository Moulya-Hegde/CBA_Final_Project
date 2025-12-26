import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthDialog from './components/AuthDialog'
import { useAuth } from "./context/AuthContext.jsx";

// Pages
import ConfirmPage from './pages/ConfirmPage'
import Home from './pages/Home'
import Facilities from './pages/Facilities'
import ContactUs from './pages/ContactUs'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import ChatWindow from './components/ChatWindow'
import ChatToggleButton from './components/ChatToggleButton'
import MyBookings from './pages/MyBookings';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { authOpen, closeAuth } = useAuth();

  // THE FIX: The heavy useEffect is gone. 
  // The database trigger now handles profile creation instantly.

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/confirm" element={<ConfirmPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
        
        <AuthDialog open={authOpen} onClose={closeAuth} />

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