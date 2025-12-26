import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import ContactInfo from "../components/contact-us/ContactInfo";
import ContactForm from "../components/contact-us/ContactForm";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const ContactUs = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="flex flex-col items-center text-center max-w-7xl w-full">
            {/* Welcome Text */}
            <p className="text-white font-raleway font-light tracking-[0.4em] mb-4 text-sm sm:text-lg md:text-2xl animate-fade-in">
              GET IN TOUCH
            </p>

            {/* Main Heading Group */}
            <div className="flex flex-col items-center">
              <h1
                className="text-white font-serif leading-none tracking-tighter sm:tracking-normal
                   text-[15vw] sm:text-[100px] md:text-[120px] lg:text-[154px]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                CONTACT
              </h1>

              <h2
                className="text-white font-serif italic leading-none -mt-2 sm:-mt-4
                   text-[15vw] sm:text-[80px] md:text-[100px]"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                US
              </h2>
            </div>

            {/* CTA Button */}
            <div className="pt-10 md:pt-14">
              <button
                onClick={scrollToNext}
                className="
          group relative px-12 py-4
          text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em]
          border border-white text-white overflow-hidden
          transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
        "
              >
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                  Reach Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              How to Reach Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Multiple ways to get in touch with our team. Choose what works
              best for you.
            </p>
          </div>
          <ContactInfo />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              Visit Us
            </h2>
            <p className="text-gray-600 text-lg">
              Find our luxury hotels across the globe
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5842697834686!2d77.51181207507632!3d12.825158318603838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae41057dd66abf%3A0xfda823a3ca1775ea!2sDayananda%20Sagar%20Academy%20of%20Technology%20and%20Management%20(DSATM)!5e0!3m2!1sen!2sin!4v1735037000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
