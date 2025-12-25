import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '../ui/button';

const Footer = () => {
  return (
    <footer className="bg-[#1a2742] text-white relative">
      {/* Decorative triangle */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
        <div className="w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[50px] border-b-[#1a2742]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-serif mb-4">LUXURY</h3>
            <p className="text-sm text-gray-300 mb-2">
              497 Evergreen Rd. Roseville, CA 95673
            </p>
            <p className="text-sm text-gray-300 mb-2">
              +44 345 678 903
            </p>
            <p className="text-sm text-gray-300">
              luxury.hotels@gmail.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Subscribe to our newsletter</h4>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-2 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]"
              />
              <Button className="bg-[#D4A574] hover:bg-[#C4956F] text-white px-6">
                OK
              </Button>
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-[#D4A574] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-[#D4A574] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-[#D4A574] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
