import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ConfirmPage from './pages/ConfirmPage'
import Home from './pages/Home'
import { useEffect } from 'react'
import { supabase } from './lib/supabase'
export default function App() {
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
            // Not found → create profile
            const username =
              user.user_metadata?.full_name || user.user_metadata?.username|| user.email.split("@")[0];

            await supabase.from("profiles").insert({
              id: user.id,
              email: user.email,
              username,
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
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/confirm" element={<ConfirmPage />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}
