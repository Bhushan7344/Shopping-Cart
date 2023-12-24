// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if the item is already in the cart
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
    
      if (existingItemIndex !== -1) {
        // If the item is already in the cart, update its quantity
        const updatedItems = state.items.map(item => (
          item.id === action.payload.id
            ? { ...item, quantity: (item.quantity || 0) + action.payload.quantity }
            : item
        ));
    
        return { ...state, items: updatedItems };
      } else {
        // If the item is not in the cart, add it
        return { ...state, items: [...state.items, action.payload] };
      }
    

    case 'REMOVE_FROM_CART':
      state.items = state.items.filter(item => item.id !== action.payload.id);
      return { ...state };

      case 'INCREASE_QUANTITY':
        // Increase the quantity of the item based on its id
        const increasedItems = state.items.map(item => (
          item.id === action.payload.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        ));
      
        return { ...state, items: increasedItems };
      
      case 'DECREASE_QUANTITY':
        // Decrease the quantity of the item based on its id, and remove it if the quantity becomes zero
        const decreasedItems = state.items.map(item => (
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, (item.quantity || 0) - 1) }
            : item
        ));
      
        return { ...state, items: decreasedItems };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const increaseQuantity = (item) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: item });
  };

  const decreaseQuantity = (item) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: item });
  };

  return (
    <CartContext.Provider value={{ cartState, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
