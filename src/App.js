// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductDetails from './components/ProductDetails';
import { CartProvider } from './components/CartContext';
import CartDetails from './components/CartDetails';

const App = () => {
  return (
    <CartProvider>
    
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartDetails />} />
        </Routes>
    
    </CartProvider>
  );
};

export default App;
