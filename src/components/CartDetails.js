// CartDetails.js
import React, { useState } from 'react';
import { useCart } from './CartContext';
import './CartDetails.css';

const CartDetails = () => {
  const { cartState, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    // Add more shipping details as needed
  });

  const calculateTotal = () => {
    return cartState.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    alert('Order Confirmed! Thank you for shopping with us.');
  };

  return (
    <div className="cart-container">
  <h2>Shopping Cart</h2>
  {cartState.items.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <div>
      {cartState.items.map((item, index) => (
        <div className="cart-item" key={item.id}>
          <div className="product-details">
            <img src={item.image} alt={item.name} className="product-image" />
            <div className="product-info">
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
            </div>
          </div>
          <div className="quantity-controls">
            <button onClick={() => decreaseQuantity(item)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item)}>+</button>
          </div>
          <button onClick={() => removeFromCart(item)} className="remove-icon">
            {/* Add your remove icon here */}
            Remove
          </button>
        </div>
      ))}
          <p className="total-amount">Total Amount: ${calculateTotal()}</p>

          {/* Checkout Section */}
          <div className="checkout-section">
            <h2>Checkout</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  value={shippingDetails.name}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                />
              </label>
              <label>
                Address:
                <textarea
                  value={shippingDetails.address}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                />
              </label>
              {/* Add more shipping details inputs here as needed */}
            </form>

            <button className="checkout-btn" onClick={handleCheckout}>
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetails;
