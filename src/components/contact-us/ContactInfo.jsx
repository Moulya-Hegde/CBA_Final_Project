import { useEffect, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';

const ContactInfo = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);
  const contactInfo = [
    {
      title: 'Office Hours',
      icon: Clock,
      description: ['Monday - Friday', '9:00 AM to 6:00 PM'],
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Our Address',
      icon: MapPin,
      description: ['Dayananda Sagar Academy of Technology', 'and Management (DSATM)'],
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Phone Number',
      icon: Phone,
      description: ['+44 345 678 903', '+1 234 567 890'],
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Email Address',
      icon: Mail,
      description: ['luxury.hotels@gmail.com', 'support@luxury.com'],
      color: 'bg-amber-50 text-amber-600'
    }
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
      {contactInfo.map((info, index) => {
        const Icon = info.icon;
        const animationDelay = `animation-delay-${(index + 1) * 100}`;
        return (
          <Card
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden animate-fade-in-up ${animationDelay}`}
          >
            <CardContent className="flex flex-col items-center gap-4 text-center pt-8 pb-8 relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 group-hover:to-gray-100/50 transition-all duration-300" />

              {/* Icon */}
              <div className="relative">
                <Avatar className={`size-14 border-2 border-gray-200 shadow-md transition-all duration-300 group-hover:border-[#D4A574] ${info.color}`}>
                  <AvatarFallback className={`${info.color}`}>
                    <Icon className="w-7 h-7" />
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Content */}
              <div className="space-y-2 relative">
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#D4A574] transition-colors duration-300">
                  {info.title}
                </h4>
                <div className="text-gray-600 text-sm font-medium space-y-1">
                  {info.description.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ContactInfo;
