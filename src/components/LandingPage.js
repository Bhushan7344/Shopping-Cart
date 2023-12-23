// LandingPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import './LandingPage.css';
import { useCart } from './CartContext';
import { FiShoppingCart } from 'react-icons/fi'; 

const LandingPage = () => {
  const { addToCart, cartState } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="cart-icon-container">
        <Link to="/cart" className="cart-link">
          <FiShoppingCart className="cart-icon" />
          {cartState.items.length > 0 && <span className="cart-count">{cartState.items.length}</span>}
        </Link>
      </div>

      <h1>Shopping Cart App</h1>

      <div>
        <h2>Products</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
