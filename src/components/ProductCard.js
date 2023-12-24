import React from 'react';
import './ProductCard.css';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    console.log(`Added ${product.name} to the cart`);
  };

  return (
    <div className="product-card">
      <img src={require(`../assets/${product.id}.jpg`)} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>

      <div className="button-container">
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
        <button className="view-details-button">
        <Link to={`/product/${product.id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
