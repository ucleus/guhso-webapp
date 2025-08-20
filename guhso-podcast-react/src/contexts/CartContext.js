import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return action.payload;
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      let items;
      if (existing) {
        items = state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i
        );
      } else {
        items = [...state.items, action.payload];
      }
      return { items, total: calculateTotal(items) };
    }
    case 'REMOVE': {
      const items = state.items.filter((i) => i.id !== action.payload);
      return { items, total: calculateTotal(items) };
    }
    case 'UPDATE': {
      const items = state.items
        .map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        );
      return { items, total: calculateTotal(items) };
    }
    case 'CLEAR':
      return { items: [], total: 0 };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    { items: [], total: 0 },
    (initial) => {
      try {
        const saved = localStorage.getItem('guhso-cart');
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        // ignore
      }
      return initial;
    }
  );

  useEffect(() => {
    localStorage.setItem('guhso-cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD', payload: { ...item, quantity: item.quantity || 1 } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE', payload: { id, quantity } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR' });

  const getItemCount = () =>
    state.items.reduce((count, item) => count + item.quantity, 0);

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;

