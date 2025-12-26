import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

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

  // Check if we're on a detail page (like /rooms/2)
  const isDetailPage = () => {
    const detailPagePatterns = [
      /^\/rooms\/\d+$/,  // matches /rooms/1, /rooms/2, etc.
      /^\/facilities\/\d+$/,  // matches /facilities/1, etc.
    ];
    return detailPagePatterns.some(pattern => pattern.test(location.pathname));
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
    <>
      {/* Universal Logo Badge - Connected to top */}
      <div
        className="absolute z-50 flex flex-col items-center justify-center shadow-xl"
        style={{
          position: 'absolute',
          top: 0,
          left: '213px',
          width: '256px',
          height: '149px',
          background: 'linear-gradient(to bottom right, #D4B574, #C4A962)',
          borderBottomLeftRadius: '60px',
          borderBottomRightRadius: '60px',
        }}
      >
        {/* LUXURY Text */}
        <h1
          style={{
            fontFamily: "'EB Garamond', 'Adobe Garamond Pro', 'Garamond', 'Georgia', serif",
            fontWeight: 700,
            fontSize: '40px',
            lineHeight: '100%',
            letterSpacing: '0.15em',
            color: '#3d5f76',
            margin: 0,
            padding: 0,
          }}
        >
          LUXURY
        </h1>
        {/* HOTELS Text */}
        <p
          style={{
            fontFamily: "'EB Garamond', 'Adobe Garamond Pro', 'Garamond', 'Georgia', serif",
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0.4em',
            color: '#3d5f76',
            margin: 0,
            padding: 0,
            marginTop: '8px',
          }}
        >
          HOTELS
        </p>
      </div>

      <nav
        className={`absolute z-40 transition-all duration-700 ease-in-out ${
          isDetailPage()
            ? 'bg-[#3d5f76] shadow-xl'
            : isScrolled
            ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl backdrop-blur-lg'
            : 'bg-transparent'
        }`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          minHeight: '120px',
          backdropFilter: isScrolled || isDetailPage() ? 'blur(10px)' : 'none',
        }}
      >
        {/* Navigation Links - Absolute positioned */}
        <div
          className="flex items-center"
          style={{
            position: 'absolute',
            top: '59px',
            left: '1011px',
            height: '31px',
            gap: '90px',
            zIndex: 50,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`text-white transition-all duration-300 hover:text-[#C4A962] hover:scale-110 ${
                isActiveLink(link.path)
                  ? 'border-b-2 border-[#C4A962] pb-1 scale-105'
                  : 'pb-1'
              }`}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '25px',
                lineHeight: '100%',
                letterSpacing: '0%',
                height: '30px',
              }}
            >
              {link.name}
            </Link>
          ))}

          {/* Cart Icon */}
          <button
            onClick={() => navigate('/cart')}
            className="relative text-white hover:text-[#C4A962] transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <ShoppingCart className="w-7 h-7" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C4A962] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Bottom border */}
        <div
          className={`h-0.5 bg-gradient-to-r from-transparent via-[#C4A962] to-transparent transition-opacity duration-700 ${
            isScrolled || isDetailPage() ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </nav>
    </>
  );
};

export default Navbar;
