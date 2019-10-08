import React, { useContext, useState } from 'react';

// Components
import Item from './ShoppingCartItem';

// Contexts
import CartContext from '../contexts/CartContext';

const ShoppingCart = () => {
  const { cart } = useContext(CartContext);
  const getCartTotal = () => {
    return cart
      .reduce((acc, value) => {
        return acc + value.price * value.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className='shopping-cart'>
      {cartItems.map(item => (
        <Item key={item.id} {...item} removeItem={removeItem} updateItemQuantity={updateItemQuantity} />
      ))}

      <div className='shopping-cart__checkout'>
        <p>Total: ${cartTotal()}</p>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
