import Navbar from '../components/home/Navbar';
import HeroSection from '../components/home/HeroSection';
import IntroSection from '../components/home/IntroSection';
import LocationsCarousel from '../components/home/LocationsCarousel';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Footer from '../components/home/Footer';
import { Button, Typography, Container, Box } from "@mui/material";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
const Home = () => {
  const [user, setUser] = useState(null);
  const [openAuth, setOpenAuth] = useState(false);

  useEffect(() => {
    // Initial check
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    // Listener for login/logout
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_IN") setOpenAuth(false); // Close dialog on login
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <IntroSection />
      <LocationsCarousel />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Home;