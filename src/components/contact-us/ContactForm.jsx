import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Send, CheckCircle2 } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);
  const formFieldsRef = useRef([]);

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

    // Observe main sections
    if (leftSideRef.current) observer.observe(leftSideRef.current);
    if (rightSideRef.current) observer.observe(rightSideRef.current);

    // Observe all form fields
    formFieldsRef.current.forEach((field) => {
      if (field) observer.observe(field);
    });

    return () => {
      if (leftSideRef.current) observer.unobserve(leftSideRef.current);
      if (rightSideRef.current) observer.unobserve(rightSideRef.current);
      formFieldsRef.current.forEach((field) => {
        if (field) observer.unobserve(field);
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Left side - Image/Info */}
      <div ref={leftSideRef} className="space-y-6 animate-fade-in-left">
        <div>
          <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Get In Touch
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            We'd love to hear from you! Whether you have a question about our facilities,
            pricing, reservations, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        {/* Image with overlay */}
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80"
            alt="Hotel Reception"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800&h=600&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h4 className="text-white text-2xl font-serif mb-2">Visit Our Hotel</h4>
            <p className="text-gray-200 text-sm">We're here to help and answer your questions</p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <Card ref={rightSideRef} className="shadow-2xl border-none animate-fade-in-right">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-2xl font-serif">Send us a Message</CardTitle>
          <CardDescription className="text-base">
            Fill out the form below and we'll get back to you within 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-scale-in">
              <div className="bg-green-100 rounded-full p-4 animate-bounce-in">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Thank You!</h4>
              <p className="text-gray-600 text-center">
                Your message has been sent successfully. We'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div ref={(el) => (formFieldsRef.current[0] = el)} className="space-y-2 animate-slide-up animation-delay-200">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="h-11 focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all duration-300 hover:shadow-md"
                />
              </div>

              {/* Email and Phone in grid */}
              <div ref={(el) => (formFieldsRef.current[1] = el)} className="grid sm:grid-cols-2 gap-4 animate-slide-up animation-delay-300">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="h-11 focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all duration-300 hover:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 890"
                    className="h-11 focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all duration-300 hover:shadow-md"
                  />
                </div>
              </div>

              {/* Subject */}
              <div ref={(el) => (formFieldsRef.current[2] = el)} className="space-y-2 animate-slide-up animation-delay-400">
                <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  className="h-11 focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all duration-300 hover:shadow-md"
                />
              </div>

              {/* Message */}
              <div ref={(el) => (formFieldsRef.current[3] = el)} className="space-y-2 animate-slide-up animation-delay-500">
                <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  required
                  rows={5}
                  className="resize-none focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all duration-300 hover:shadow-md"
                />
              </div>

              {/* Submit Button */}
              <div ref={(el) => (formFieldsRef.current[4] = el)} className="animate-slide-up animation-delay-600">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#C4A962] hover:bg-[#B39952] text-white font-semibold h-12 text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
