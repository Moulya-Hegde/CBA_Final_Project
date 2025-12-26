import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const formRef = useRef(); // Added for EmailJS sendForm

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
      { threshold: 0.1 }
    );

    if (leftSideRef.current) observer.observe(leftSideRef.current);
    if (rightSideRef.current) observer.observe(rightSideRef.current);
    formFieldsRef.current.forEach((field) => {
      if (field) observer.observe(field);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // PASTE YOUR ACTUAL KEYS HERE
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
    emailjs.init(PUBLIC_KEY);
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        
        // Return to form after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch((err) => {
        console.error('Email Error:', err);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Left side - Kept exactly as your original */}
      <div ref={leftSideRef} className="space-y-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Get In Touch</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            We'd love to hear from you! Our team is ready to answer all your questions.
          </p>
        </div>
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80"
            alt="Hotel Reception"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h4 className="text-2xl font-serif mb-2">Visit Our Hotel</h4>
            <p className="text-gray-200 text-sm">We're here to help</p>
          </div>
        </div>
      </div>

      {/* Right side - Integrated EmailJS */}
      <Card ref={rightSideRef} className="shadow-2xl border-none">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-2xl font-serif">Send us a Message</CardTitle>
          <CardDescription>We'll get back to you within 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-in fade-in zoom-in">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Inquiry Sent</h4>
              <p className="text-gray-600 text-center">Your message reached our concierge successfully.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div ref={(el) => (formFieldsRef.current[0] = el)} className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name *</Label>
                <Input
                  id="name"
                  name="name" // Matches {{name}} in EmailJS template
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="h-11"
                />
              </div>

              <div ref={(el) => (formFieldsRef.current[1] = el)} className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address *</Label>
                  <Input
                    id="email"
                    name="email" // Matches {{email}} in EmailJS template
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone" // Matches {{phone}} in EmailJS template
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 890"
                    className="h-11"
                  />
                </div>
              </div>

              <div ref={(el) => (formFieldsRef.current[2] = el)} className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">Subject *</Label>
                <Input
                  id="subject"
                  name="subject" // Matches {{subject}} in EmailJS template
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="h-11"
                />
              </div>

              <div ref={(el) => (formFieldsRef.current[3] = el)} className="space-y-2">
                <Label htmlFor="message" className="text-sm font-semibold text-gray-700">Message *</Label>
                <Textarea
                  id="message"
                  name="message" // Matches {{message}} in EmailJS template
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  required
                  rows={5}
                  className="resize-none"
                />
              </div>

              <div ref={(el) => (formFieldsRef.current[4] = el)}>
                <Button
                  type="submit"
                  disabled={status === 'sending'}
                  size="lg"
                  className="w-full bg-[#C4A962] hover:bg-[#B39952] text-white font-semibold h-12 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                >
                  {status === 'sending' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
                {status === 'error' && (
                  <p className="text-red-500 text-xs text-center mt-2">Submission failed. Please try again.</p>
                )}
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;