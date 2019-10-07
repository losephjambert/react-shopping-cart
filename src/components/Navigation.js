import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

// Contexts
import CartContext from '../contexts/CartContext';

const Navigation = () => {
  const { cartItems } = useContext(CartContext);
  const total = cartItems.reduce((a, b) => a + b.quantity, 0);
  return (
    <div className='navigation'>
      <NavLink to='/'>Products</NavLink>
      <NavLink to='/cart'>
        Cart <span>{total}</span>
      </NavLink>
    </div>
  );
};

export default Navigation;
