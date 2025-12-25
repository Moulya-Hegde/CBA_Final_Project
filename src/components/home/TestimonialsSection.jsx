import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Calm, Serene, Retro – What a way to relax and enjoy",
      author: "Deepika",
      location: "India",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepika",
      fallback: "D"
    },
    {
      quote: "Perfect getaway with stunning views and exceptional service",
      author: "Moulya",
      location: "India",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Moulya",
      fallback: "M"
    },
    {
      quote: "An unforgettable experience in paradise. Highly recommended!",
      author: "John",
      location: "USA",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      fallback: "J"
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-16 text-center">
          Testimonials
        </h2>

        <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Decorative quote icon */}
          <div className="absolute top-6 left-6 text-[#D4A574] opacity-20">
            <Quote className="w-16 h-16" />
          </div>

          <div className="relative z-10">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <Avatar className="w-20 h-20 border-4 border-[#D4A574] shadow-lg">
                <AvatarImage
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                />
                <AvatarFallback className="bg-[#D4A574] text-white text-xl font-semibold">
                  {testimonials[currentIndex].fallback}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Quote */}
            <p className="text-xl md:text-2xl text-gray-700 italic text-center mb-6 leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </p>

            {/* Author */}
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">
                {testimonials[currentIndex].author}
              </p>
              <p className="text-sm text-gray-500">
                {testimonials[currentIndex].location}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={prevTestimonial}
                className="bg-[#D4A574] hover:bg-[#C4956F] text-white p-3 rounded-full transition-all transform hover:scale-110 shadow-md"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-[#D4A574] hover:bg-[#C4956F] text-white p-3 rounded-full transition-all transform hover:scale-110 shadow-md"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[#D4A574] w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
