import React, { useContext } from 'react';

// Components
import Item from './ShoppingCartItem';

// Contexts
import CartContext from '../contexts/CartContext';

const ShoppingCart = () => {
  const { cartItems, removeItem, updateItemQuantity } = useContext(CartContext);

  const cartTotal = () => {
    return cartItems
      .reduce((accumulatedPrice, currentCartItem) => {
        return accumulatedPrice + currentCartItem.quantity * currentCartItem.price;
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
