import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Info, MapPin, Phone, User, Mail } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});

  const subtotal = getCartTotal();
  const taxRate = 0.12;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Show confirmation animation
    setShowConfirmation(true);

    // Clear cart after 2 seconds and navigate to home
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (cartItems.length === 0 && !showConfirmation) {
    navigate('/cart');
    return null;
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
                <Check className="w-16 h-16 text-green-600 animate-bounce-in" strokeWidth={3} />
              </div>
              <div className="absolute inset-0 w-32 h-32 bg-green-400 rounded-full animate-ping opacity-25"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 playfair-display">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 raleway mb-2">
            Thank you for your booking, {formData.fullName}
          </p>
          <p className="text-gray-500 raleway">
            We've sent a confirmation email to {formData.email}
          </p>
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 text-[#C4A962] raleway">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#C4A962] border-t-transparent"></div>
              <span>Redirecting to home...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/cart')}
          className="mb-6 hover:bg-gray-100 raleway cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Button>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 playfair-display mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 raleway">
            Complete your booking details
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl playfair-display">
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-700 raleway flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`${errors.fullName ? 'border-red-500' : ''}`}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500 raleway">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email and Phone in Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 raleway flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className={`${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 raleway">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 raleway flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        className={`${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 raleway">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Address Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 playfair-display flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#C4A962]" />
                      Address Details
                    </h3>

                    {/* Street Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-700 raleway">
                        Street Address *
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="House/Flat No., Building Name, Street"
                        rows={3}
                        className={`${errors.address ? 'border-red-500' : ''}`}
                      />
                      {errors.address && (
                        <p className="text-sm text-red-500 raleway">{errors.address}</p>
                      )}
                    </div>

                    {/* City, State, Pincode in Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* City */}
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-700 raleway">
                          City *
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className={`${errors.city ? 'border-red-500' : ''}`}
                        />
                        {errors.city && (
                          <p className="text-sm text-red-500 raleway">{errors.city}</p>
                        )}
                      </div>

                      {/* State */}
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-gray-700 raleway">
                          State *
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          type="text"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                          className={`${errors.state ? 'border-red-500' : ''}`}
                        />
                        {errors.state && (
                          <p className="text-sm text-red-500 raleway">{errors.state}</p>
                        )}
                      </div>

                      {/* Pincode */}
                      <div className="space-y-2">
                        <Label htmlFor="pincode" className="text-gray-700 raleway">
                          Pincode *
                        </Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          type="text"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="6-digit pincode"
                          maxLength={6}
                          className={`${errors.pincode ? 'border-red-500' : ''}`}
                        />
                        {errors.pincode && (
                          <p className="text-sm text-red-500 raleway">{errors.pincode}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-semibold raleway cursor-pointer"
                      size="lg"
                    >
                      Place Order
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32 border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl playfair-display">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 raleway truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600 raleway">
                          {item.quantity} {item.quantity === 1 ? 'night' : 'nights'} × ₹{item.price.toLocaleString('en-IN')}
                        </p>
                        {item.badge && (
                          <Badge className="mt-1 text-xs bg-[#C4A962]/10 text-[#C4A962] hover:bg-[#C4A962]/20">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center raleway">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center raleway">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">GST (12%)</span>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{taxAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-gray-900 playfair-display">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-[#C4A962] playfair-display">
                      ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Security Features */}
                <div className="space-y-2 text-sm text-gray-600 raleway">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Secure booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Free cancellation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Instant confirmation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
