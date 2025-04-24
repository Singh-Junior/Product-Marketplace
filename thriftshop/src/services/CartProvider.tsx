import { useState, useEffect } from 'react';
import { getCurrentUser, setCurrentUser } from '../utils/auth';
import { CartItem } from '../types/user';

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.cart) {
      setCart(user.cart);  // Load existing cart from currentUser
    }
  }, []);

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (productIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;  // Increase quantity if already in cart
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];  // Add new product with quantity 1
      }
    });
  };

  const clearCart = () => {
    setCart([]);  // Reset the cart to an empty array
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));  // Filter out the item with the given id
  };

  const decreaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser({ ...user, cart });  // Update cart in localStorage
    }
  }, [cart]);

  return { cart, addToCart, clearCart, removeFromCart, decreaseQuantity };
};

export default useCart;
