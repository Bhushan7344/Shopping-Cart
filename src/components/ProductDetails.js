// ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './ProductDetails.css';
import products from '../assets/products.json'; // Import the products JSON file

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cartState } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const selectedProduct = products.find((item) => item.id === parseInt(id, 10));
    if (selectedProduct) {
      setProduct(selectedProduct);
      setLoading(false);
    } else {
      setError('Product not found');
      setLoading(false);
    }
  }, [id]);
  

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <div className="product-details">
        <img src={require(`../assets/${product.id}.jpg`)} alt={product.name} className="product-image" />
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Link to="/cart" className="cart-link">
            View Cart ({cartState.items.length})
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
