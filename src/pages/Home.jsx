import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import AuthDialog from "../components/AuthDialog";

const Home = () => {
  const [user, setUser] = useState(null);
  const [openAuth, setOpenAuth] = useState(false);

  // Sync user state with Supabase
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // update UI immediately
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <h2>
            Welcome {user.user_metadata?.full_name || user.email.split("@")[0]}
          </h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h2>Please log in</h2>
          <button onClick={() => setOpenAuth(true)}>Login / Sign Up</button>
          <AuthDialog open={openAuth} onClose={() => setOpenAuth(false)} />
        </>
      )}
    </div>
  );
};

export default Home;
