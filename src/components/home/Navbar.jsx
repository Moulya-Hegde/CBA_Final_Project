import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Check if we're on a detail page (like /rooms/2) or cart page
  const isDetailPage = () => {
    const detailPagePatterns = [
      /^\/rooms\/\d+$/,  // matches /rooms/1, /rooms/2, etc.
      /^\/facilities\/\d+$/,  // matches /facilities/1, etc.
      /^\/cart$/,  // matches /cart
    ];
    return detailPagePatterns.some(pattern => pattern.test(location.pathname));
  };

  return (
    <>
      {/* Universal Logo Badge - Desktop: Fixed position at 213px, Mobile: Responsive */}
      {/* Mobile/Tablet Logo (hidden on lg+) */}
      <div
        className="lg:hidden absolute z-50 flex flex-col items-center justify-center shadow-xl left-4 sm:left-8 md:left-12"
        style={{
          position: 'absolute',
          top: 0,
          width: 'clamp(150px, 30vw, 256px)',
          height: 'clamp(80px, 15vw, 149px)',
          background: 'linear-gradient(to bottom right, #D4B574, #C4A962)',
          borderBottomLeftRadius: 'clamp(30px, 5vw, 60px)',
          borderBottomRightRadius: 'clamp(30px, 5vw, 60px)',
        }}
      >
        <h1
          className="text-xl sm:text-2xl md:text-3xl"
          style={{
            fontFamily: "'EB Garamond', 'Adobe Garamond Pro', 'Garamond', 'Georgia', serif",
            fontWeight: 700,
            lineHeight: '100%',
            letterSpacing: '0.15em',
            color: '#3d5f76',
            margin: 0,
            padding: 0,
          }}
        >
          LUXURY
        </h1>
        <p
          className="text-xs sm:text-sm"
          style={{
            fontFamily: "'EB Garamond', 'Adobe Garamond Pro', 'Garamond', 'Georgia', serif",
            fontWeight: 700,
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

      {/* Desktop Logo (hidden below lg) */}
      <div
        className="hidden lg:flex absolute z-50 flex-col items-center justify-center shadow-xl"
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
            ? 'bg-gray-900 shadow-xl'
            : 'bg-transparent'
        }`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          minHeight: '120px',
          backdropFilter: isDetailPage() ? 'blur(10px)' : 'none',
        }}
      >
        {/* Desktop Navigation Links - Absolute positioned (lg and up) */}
        <div
          className="hidden lg:flex items-center"
          style={{
            position: 'absolute',
            top: '59px',
            left: '950px',
            height: '31px',
            gap: '90px',
            zIndex: 50,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`text-white transition-all duration-300 hover:text-[#C4A962] ${
                isActiveLink(link.path)
                  ? 'border-b-2 border-[#C4A962] pb-1'
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

          {/* Cart Icon - Desktop */}
          <button
            onClick={() => navigate('/cart')}
            className="relative text-white hover:text-[#C4A962] transition-all duration-300 hover:scale-110 cursor-pointer mr-8"
          >
            <ShoppingCart className="w-7 h-7" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C4A962] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Navigation - Flex layout (below lg) */}
        <div className="lg:hidden h-full flex items-start justify-end px-4 sm:px-6 pt-[25px]">
          <div className="flex items-center space-x-4">
            {/* Cart Icon - Mobile */}
            <button
              onClick={() => navigate('/cart')}
              className="relative text-white hover:text-[#C4A962] transition-all duration-300 cursor-pointer mr-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C4A962] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#C4A962] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`lg:hidden fixed top-[120px] right-0 h-full w-64 bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col p-6 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-white text-xl font-bold transition-all duration-300 hover:text-[#C4A962] hover:translate-x-2 ${
                  isActiveLink(link.path)
                    ? 'text-[#C4A962] border-l-4 border-[#C4A962] pl-4'
                    : 'pl-4'
                }`}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-[120px]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Bottom border */}
        <div
          className={`h-0.5 bg-gradient-to-r from-transparent via-[#C4A962] to-transparent transition-opacity duration-700 ${
            isDetailPage() ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </nav>
    </>
  );
};

export default Navbar;
