import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'Facilities', path: '/facilities', id: 'facilities' },
    { name: 'Rooms', path: '/rooms', id: 'rooms' },
    { name: 'Contact-us', path: '/contact', id: 'contact' },
  ];

  // Determine active link based on current path
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl backdrop-blur-lg'
          : 'bg-transparent'
      }`}
      style={{
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className={`shrink-0 transition-transform duration-500 ${
            isScrolled ? 'scale-95' : 'scale-100'
          }`}>
            <div className="bg-gradient-to-br from-[#C4A962] to-[#B39952] rounded-lg w-46.5 h-15 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h1 className="text-white text-xl font-semibold tracking-wide">
                LUXURY
              </h1>
              <p className="text-white text-xs tracking-widest">HOTELS</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className={`montserrat text-white font-bold transition-all duration-300 hover:text-[#C4A962] hover:scale-110 ${
                  isActiveLink(link.path)
                    ? 'border-b-2 border-[#C4A962] pb-1 scale-105'
                    : 'pb-1'
                }`}
                style={{
                  fontSize: '25px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  fontWeight: 700,
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border animation */}
      <div
        className={`h-0.5 bg-gradient-to-r from-transparent via-[#C4A962] to-transparent transition-opacity duration-700 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </nav>
  );
};

export default Navbar;
