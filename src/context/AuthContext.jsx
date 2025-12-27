import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    // 1. Define a function to sync user state and stop loading
    const setData = async (session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
    
      if (currentUser) {
        // Fetch the boolean from your profiles table
        const { data } = await supabase
          .from('profiles') 
          .select('is_admin')
          .eq('id', currentUser.id)
          .single();
        
        setIsAdmin(data?.is_admin || false);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };

    // 2. Initial Session Check
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setData(session);
      } catch (err) {
        console.error("Auth init failed:", err);
        setData(null); // Force stop loading even on error
      }
    };

    initAuth();

    // 3. Listen for Auth Changes (Login, Logout, Token Refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setData(session);
    });

    // 4. SAFETY TIMEOUT: If auth takes more than 5 seconds, force stop loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
      setAuthOpen(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin,
        authOpen,
        openAuth,
        closeAuth,
        logout,
      }}
    >
      {/* Optimization: We only hide the whole app if absolutely necessary. 
         Usually, it's better to let components handle their own loading state 
         via the 'loading' variable provided below.
      */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};