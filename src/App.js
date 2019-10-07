import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Contexts
import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState(new Map([]));

  /**
   * Shape of cartItems
   *
      [
        {
          id: n,
          quantity: m
        }
      ]
   */

  const addItem = item => {
    // add the given item to the cart
    setCart([...cart, item]);

    if (cartItems.has(item.id)) {
      setCartItems(prevCartItems => cartItems.set(item.id, prevCartItems.get(item.id) + 1));
    } else {
      setCartItems(cartItems.set(item.id, 1));
    }
  };

  const removeItem = id => {
    const filteredCart = cart.filter(item => item.id !== id);
    setCart(filteredCart);
  };

  return (
    <div className='App'>
      <ProductContext.Provider value={{ products, addItem, removeItem }}>
        <CartContext.Provider value={{ cart }}>
          <Navigation cart={cart} />
          {/* Routes */}
          <Route exact path='/' component={Products} />
          <Route path='/cart' component={ShoppingCart} />
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
