import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import AuthDialog from "../components/AuthDialog";
import { Button, Typography, Container, Box } from "@mui/material";

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
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h2" sx={{ fontFamily: 'Raleway', fontWeight: 700, mb: 2 }}>
          LuxeStay Hotel
        </Typography>

        {user ? (
          <Box>
            <Typography variant="h5" sx={{ mb: 4, fontFamily: 'Raleway' }}>
              Welcome back, {user.user_metadata?.username || user.email.split("@")[0]}!
            </Typography>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleLogout}
              sx={{ borderRadius: 2 }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Experience luxury like never before. Please sign in to book your stay.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => setOpenAuth(true)}
              sx={{ borderRadius: 3, px: 6, py: 1.5, textTransform: 'none', fontSize: '1.1rem' }}
            >
              Get Started
            </Button>
            <AuthDialog open={openAuth} onClose={() => setOpenAuth(false)} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;