import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Calendar, User } from "lucide-react";
import AuthDialog from "@/components/AuthDialog";
import { useAuth } from "@/context/AuthContext.jsx";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout, authOpen, openAuth, closeAuth, loading } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Facilities", path: "/facilities" },
    { name: "Rooms", path: "/rooms" },
    { name: "Contact", path: "/contact" },
  ];

  // Get avatar from user metadata (Google) or use a fallback
  const userAvatar = user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.email}&background=random`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0a0b0e] py-3 shadow-2xl"
            : "bg-transparent py-2 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start z-10">
            <span className="text-white text-2xl font-bold tracking-[0.3em] playfair-display">
              ZIVARA
            </span>
            <span className="text-[10px] text-gray-300 tracking-[0.5em] mt-1">
              HOTELS & RESORTS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link-ltr relative text-s montserrat font-bold tracking-[0.2em] uppercase transition-all ${
                  location.pathname === link.path
                    ? "text-white nav-link-active"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {loading ? (
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                Loading...
              </span>
            ) : user ? (
              <div className="flex items-center gap-6 border-l border-gray-700 pl-6">
                {/* My Bookings Link */}
                <Link
                  to="/my-bookings"
                  className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${
                    location.pathname === "/my-bookings" ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Calendar size={14} />
                  <span>My Bookings</span>
                </Link>

                {/* User Info & Logout */}
                <div className="flex items-center gap-3">
                  <img 
                    src={userAvatar} 
                    alt="profile" 
                    className="w-8 h-8 rounded-full border border-gray-600 object-cover"
                  />
                  <button
                    onClick={logout}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={openAuth}
                className={`relative px-8 py-3 text-[12px] font-bold uppercase tracking-[0.3em] border-2 rounded-lg overflow-hidden transition-all duration-500 group ${
                  isScrolled ? "border-white text-white" : "border-[#E2E8F0] text-[#E2E8F0]"
                }`}
              >
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className={`relative z-10 transition-colors duration-500 ${
                    isScrolled ? "group-hover:text-black" : "group-hover:text-[#0a0b0e]"
                }`}>
                  Sign In
                </span>
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white z-10 p-2 bg-black/20 rounded-md backdrop-blur-sm"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
            menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`fixed top-0 right-0 h-screen w-[80%] max-w-[320px] bg-[#0f1115] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-50 flex flex-col p-8 transition-transform duration-500 ease-in-out md:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mt-20 flex flex-col gap-8">
            {user && (
               <div className="flex items-center gap-4 border-b border-gray-800 pb-6 mb-2">
                 <img src={userAvatar} className="w-12 h-12 rounded-full border border-gray-700" alt="" />
                 <div>
                   <p className="text-white text-sm font-bold truncate w-40">{user.email}</p>
                   <Link to="/my-bookings" onClick={() => setMenuOpen(false)} className="text-blue-400 text-[10px] uppercase tracking-widest">View Bookings</Link>
                 </div>
               </div>
            )}

            <p className="text-[10px] tracking-[0.5em] text-gray-500 uppercase font-bold border-b border-gray-800 pb-4">
              Navigation
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-xl font-bold tracking-[0.2em] uppercase transition-colors ${
                  location.pathname === link.path ? "text-white" : "text-gray-500 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto mb-10">
            {loading ? (
              <span className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">Loading...</span>
            ) : user ? (
              <button
                onClick={logout}
                className="w-full py-4 border border-red-900/50 text-red-500 text-xs font-bold tracking-[0.2em] uppercase hover:bg-red-950 transition-all"
              >
                End Session
              </button>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openAuth();
                }}
                className="w-full py-4 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <AuthDialog open={authOpen} onClose={closeAuth} />
    </>
  );
};

export default Navbar;