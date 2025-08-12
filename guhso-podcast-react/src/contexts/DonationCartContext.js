// src/contexts/DonationCartContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const DonationCartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity for existing item (for one-time donations)
        const updatedItems = [...state.items];
        if (action.payload.frequency === 'one-time') {
          updatedItems[existingItemIndex].quantity += 1;
        }
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      } else {
        // Add new item
        const newItem = { ...action.payload, quantity: 1 };
        const newItems = [...state.items, newItem];
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems)
        };
      }
    
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems)
      };
    
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0
      };
    
    case 'SET_PROCESSING':
      return {
        ...state,
        isProcessing: action.payload
      };
    
    default:
      return state;
  }
};

// Calculate total helper function
const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    return total + itemTotal;
  }, 0);
};

// Initial state
const initialState = {
  items: [],
  total: 0,
  isProcessing: false
};

// Provider component
export const DonationCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('guhso-donation-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.items && parsedCart.items.length > 0) {
          parsedCart.items.forEach(item => {
            dispatch({ type: 'ADD_ITEM', payload: item });
          });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem('guhso-donation-cart', JSON.stringify(state));
    } else {
      localStorage.removeItem('guhso-donation-cart');
    }
  }, [state]);

  // Action creators
  const addToCart = (tier) => {
    dispatch({ type: 'ADD_ITEM', payload: tier });
  };

  const removeFromCart = (tierId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: tierId });
  };

  const updateQuantity = (tierId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: tierId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setProcessing = (isProcessing) => {
    dispatch({ type: 'SET_PROCESSING', payload: isProcessing });
  };

  // Helper functions
  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const hasSubscriptions = () => {
    return state.items.some(item => item.frequency === 'monthly');
  };

  const getOneTimeTotal = () => {
    return state.items
      .filter(item => item.frequency === 'one-time')
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getMonthlyTotal = () => {
    return state.items
      .filter(item => item.frequency === 'monthly')
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setProcessing,
    getItemCount,
    hasSubscriptions,
    getOneTimeTotal,
    getMonthlyTotal
  };

  return (
    <DonationCartContext.Provider value={value}>
      {children}
    </DonationCartContext.Provider>
  );
};

// Hook to use the cart context
export const useDonationCart = () => {
  const context = useContext(DonationCartContext);
  if (!context) {
    throw new Error('useDonationCart must be used within a DonationCartProvider');
  }
  return context;
};

export default DonationCartContext;