import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('hotelCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('hotelCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (room, guests = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === room.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === room.id
            ? { ...item, quantity: item.quantity + 1, guests }
            : item
        );
      }

      return [...prevItems, { ...room, quantity: 1, guests, inStock: true }];
    });
  };

  const removeFromCart = (roomId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== roomId));
  };

  const updateQuantity = (roomId, quantity) => {
    if (quantity < 1) {
      removeFromCart(roomId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === roomId ? { ...item, quantity } : item
      )
    );
  };

  const updateGuests = (roomId, guests) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === roomId ? { ...item, guests } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateGuests,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
