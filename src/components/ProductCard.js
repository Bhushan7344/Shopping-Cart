import React from 'react';
import './ProductCard.css';
import { useCart } from './CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    console.log(`Added ${product.name} to the cart`);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>

      <div className="button-container">
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
        <button className="view-details-button">
          <a href={`/product/${product.id}`}>View Details</a>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
