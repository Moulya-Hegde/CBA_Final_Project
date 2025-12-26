import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '../ui/button';

const Footer = () => {
  return (
    <footer className="bg-[#1a2742] text-white relative">
      {/* Decorative triangle */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full hidden sm:block">
        <div className="w-0 h-0 border-l-[30px] sm:border-l-[40px] md:border-l-[50px] border-l-transparent border-r-[30px] sm:border-r-[40px] md:border-r-[50px] border-r-transparent border-b-[30px] sm:border-b-[40px] md:border-b-[50px] border-b-[#1a2742]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-serif mb-3 sm:mb-4">LUXURY</h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-2">
              497 Evergreen Rd. Roseville, CA 95673
            </p>
            <p className="text-xs sm:text-sm text-gray-300 mb-2">
              +44 345 678 903
            </p>
            <p className="text-xs sm:text-sm text-gray-300">
              luxury.hotels@gmail.com
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Subscribe to our newsletter</h4>
            <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6 max-w-md mx-auto sm:mx-0">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-3 sm:px-4 py-2 rounded bg-white text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]"
              />
              <Button className="bg-[#D4A574] hover:bg-[#C4956F] text-white px-4 sm:px-6 text-xs sm:text-sm cursor-pointer">
                OK
              </Button>
            </div>

            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
              <a
                href="#"
                className="hover:text-[#D4A574] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="hover:text-[#D4A574] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="hover:text-[#D4A574] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
