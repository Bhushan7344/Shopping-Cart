// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import './LandingPage.css';
import { useCart } from './CartContext';
import { FiShoppingCart } from 'react-icons/fi'; 
import productData from '../assets/products.json';
import './LandingPage.css';

const LandingPage = () => {
  const { addToCart, cartState } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div>
      <div className="cart-icon-container">
        <Link to="/cart" className="cart-link">
          <FiShoppingCart className="cart-icon" />
          {cartState.items.length > 0 && <span className="cart-count">{cartState.items.length}</span>}
        </Link>
      </div>

      <h1>Shopping Cart App</h1>

      <div className="product-list">
        {productData.map((product) => (
          <ProductCard key={product.id} product={product}  />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
