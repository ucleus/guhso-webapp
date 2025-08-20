import React from 'react';
import { useCart } from '../contexts/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <span className="name">{item.name}</span>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
          />
          <span className="price">{'$'}{(item.price * item.quantity).toFixed(2)}</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <div className="cart-total">Total: {'$'}{total.toFixed(2)}</div>
      <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default CartPage;

