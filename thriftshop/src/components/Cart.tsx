// components/Cart.tsx

import React from "react";
import useCart from "../services/CartProvider"; // Custom hook for cart
import { useAlert } from "../services/useAlert"; // Global alert system
import { getCurrentUser, setCurrentUser } from "../utils/auth";
import { User } from "../types/user";
import "../styles/_cart.scss"; // Importing CSS for styling

const Cart: React.FC = () => {
  const { cart, addToCart, clearCart, removeFromCart, decreaseQuantity } =
    useCart();
  const { showAlert } = useAlert(); // Global alert system for success message

  // Increment quantity in cart
  const handleIncrease = (id: number) => {
    const product = cart.find((item) => item.id === id);
    if (product) {
      addToCart(product); // Increment quantity by adding the same item again
    }
  };

  // Decrement quantity in cart
  const handleDecrease = (id: number) => {
    decreaseQuantity(id);
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    // Get current user
    const user = getCurrentUser();

    if (user) {
      // Extract only the product ids from the cart
      const updatedBoughtItems = [
        ...(user.boughtItems || []),
        ...cart.map((item) => item.id),
      ];

      const updatedUser: User = {
        ...user,
        boughtItems: updatedBoughtItems, // Ensure it's only numbers in boughtItems
      };

      setCurrentUser(updatedUser); // Update user data with boughtItems
    }

    showAlert("success", "Order Placed Successfully!"); // Show success alert

    // Empty the cart by passing an empty array with the correct type
    clearCart(); // Specify the type as CartItem[]
  };

  // Calculate total price
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate GST (18%)
  const gstAmount = totalAmount * 0.18;

  // Final amount including GST
  const finalAmount = totalAmount + gstAmount;

  return (
    <div className="cart-items-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <img src="./shopping-cart.png" alt="Empty Cart" />
          </div>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="center-image">
                <img src={item.image} alt={item.title} />
                <div className="quantity-control">
                  <div className="plus-minus">
                    <button onClick={() => handleDecrease(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.id)}>+</button>
                  </div>
                  <div>
                    <button onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
        <div className="billing-summary">
          <p>
            Subtotal: <strong>${totalAmount.toFixed(2)}</strong>
          </p>
          <p>
            GST (18%): <strong>${gstAmount.toFixed(2)}</strong>
          </p>
          <p>
            Final Amount: <strong>${finalAmount.toFixed(2)}</strong>
          </p>
        </div>
      </div>
      {cart.length > 0 && (
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
    </div>
  );
};

export default Cart;
