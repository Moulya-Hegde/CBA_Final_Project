import { useNavigate } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowRight,
  Check,
  X,
  ShoppingCart,
  Trash2,
  Users,
  Info,
} from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, updateGuests, getCartTotal } = useCart();

  const shippingEstimate = 0; // Free shipping for hotels
  const taxRate = 0.12; // 12% GST
  const subtotal = getCartTotal();
  const taxEstimate = subtotal * taxRate;
  const orderTotal = subtotal + shippingEstimate + taxEstimate;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 sm:pt-44 md:pt-48 pb-20">
          <div className="text-center py-20">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4 playfair-display">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 raleway">
              Add some rooms to your cart to get started!
            </p>
            <Button
              onClick={() => navigate('/rooms')}
              className="bg-gray-900 hover:bg-gray-800 text-white raleway cursor-pointer"
            >
              Browse Rooms
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 sm:pt-44 md:pt-48 pb-12 sm:pb-16 md:pb-20">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 playfair-display mb-2">
            Shopping Cart
          </h1>
          <p className="text-sm sm:text-base text-gray-600 raleway">
            {cartItems.length} {cartItems.length === 1 ? 'room' : 'rooms'} in your cart
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div key={item.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Product Thumbnail */}
                      <div className="flex-shrink-0 w-full sm:w-auto">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full sm:w-24 md:w-32 h-48 sm:h-24 md:h-32 object-cover rounded-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 playfair-display">
                              {item.name}
                            </h3>
                            {item.badge && (
                              <Badge className="mt-2 bg-[#C4A962] hover:bg-[#B39952] text-white">
                                {item.badge}
                              </Badge>
                            )}
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </div>

                        {/* Variant Info */}
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3 raleway">
                          <span>{item.beds}</span>
                          <span>•</span>
                          <span>{item.guests} Guests</span>
                        </div>

                        {/* Stock Badge */}
                        <div className="mb-4">
                          {item.inStock ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              <Check className="w-3 h-3 mr-1" />
                              Available
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                              <X className="w-3 h-3 mr-1" />
                              Not Available
                            </Badge>
                          )}
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-gray-900 playfair-display">
                              ₹{item.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-gray-500 text-xs sm:text-sm raleway">per night</span>
                          </div>

                          <div className="flex items-center gap-3 sm:gap-4">
                            {/* Guests Selector */}
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                              <Select
                                value={item.guests?.toString() || '1'}
                                onValueChange={(value) => updateGuests(item.id, parseInt(value))}
                              >
                                <SelectTrigger className="w-16 sm:w-20 cursor-pointer text-xs sm:text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[...Array(item.capacity)].map((_, i) => (
                                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                                      {i + 1}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Nights Selector */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm text-gray-600 raleway">Nights:</span>
                              <Select
                                value={item.quantity.toString()}
                                onValueChange={(value) => updateQuantity(item.id, parseInt(value))}
                              >
                                <SelectTrigger className="w-16 sm:w-20 cursor-pointer text-xs sm:text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[...Array(10)].map((_, i) => (
                                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                                      {i + 1}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Total for this item */}
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 raleway">
                              Subtotal ({item.quantity} {item.quantity === 1 ? 'night' : 'nights'}):
                            </span>
                            <span className="text-lg font-bold text-gray-900 playfair-display">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {index < cartItems.length - 1 && <Separator className="my-4" />}
              </div>
            ))}

            {/* Clear Cart Button */}
            <Button
              variant="outline"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) {
                  cartItems.forEach(item => removeFromCart(item.id));
                }
              }}
              className="w-full border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600 raleway cursor-pointer"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32 border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl playfair-display">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center raleway">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center raleway">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Service Charges</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="font-semibold text-green-600">Free</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between items-center raleway">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">GST (12%)</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="font-semibold text-gray-900">
                    ₹{taxEstimate.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>

                <Separator />

                {/* Order Total */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-gray-900 playfair-display">
                    Order Total
                  </span>
                  <span className="text-2xl font-bold text-[#C4A962] playfair-display">
                    ₹{orderTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-semibold raleway mt-6 cursor-pointer"
                  size="lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                {/* Additional Info */}
                <div className="pt-4 space-y-2 text-sm text-gray-600 raleway">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Free cancellation available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Best price guarantee</span>
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

export default Cart;
